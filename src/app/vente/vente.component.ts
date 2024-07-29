import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { Console } from 'console';

interface Facture {
  prix_total: number;
  date: string;
  id_client: string | null;
}

@Component({
  selector: 'app-vente',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './vente.component.html',
  styleUrl: './vente.component.css'
})

export class VenteComponent {


  typeFacture?:string ;
  searchResults: any[] = [];
  filteredProduits?:any[];
  newResult:any[]=[];

  nameClient: string = '';
  telClient=0
  adrClient=""
  facture: Facture = {prix_total: 0,   date: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),  id_client:null}
  articlesFactures:any[]  = [];
  
  clients: any[] = [];
  filteredClients: any[] = [];


  filteredAritcles:any[] =[];
  allAritcles:any[] =[];

  clientSelected?:any;
  articleExiste:boolean=false;
  clientExiste:boolean=false;

  constructor(private router: Router, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.getClients().subscribe((data: any[]) => {
      this.clients = data;
      console.log(data);
    });
    this.loadArticles();

  }

  loadArticles()
  {
    this.sharedService.getArticles().subscribe((data: any[]) => {
      this.allAritcles = data;
      console.log(this.allAritcles);
    });
  }

  filterArticles(event: any) {
    this.articleExiste=false;
    const filterValue = event.target.value.toLowerCase();
    this.filteredAritcles = this.allAritcles.filter(article =>
      (article.nom && article.nom.toLowerCase().includes(filterValue)) 
    );
     console.log(this.filteredAritcles);
  }
  
  filterClients(event: any): void {
    this.clientExiste=false;
    const filterValue = event.target.value.toLowerCase();
    this.filteredClients = this.clients.filter(client =>
      client.nom && client.nom.toLowerCase().includes(filterValue)
    );
    console.log(this.filteredClients)
  }

  selectClient(client: any): void {
    this.clientExiste=true
    this.clientSelected=client;
    this.nameClient = client.nom;
    this.telClient = client.tel1; // Assuming client.tel1 exists
    this.adrClient = client.adresse; // Assuming client.adresse exists
    // Additional logic for selecting client can go here
  }

  productName: string = '';
  prix:number=0;
  qte:number=1;
  selectedProduct?:any;



  chooseFacture(type:string)
  {
    this.typeFacture=type;
  }
  selectArticle(product: any): void {
    this.articleExiste=true;
    
    this.productName=product.nom;
    this.prix=product.prix;
    this.selectedProduct=product;
    //this.filteredArticles(event);
  }



  
  
  
 
  add() {
    const existingArticle = this.articlesFactures.find(article =>
      this.articleExiste ? article.id === this.selectedProduct.id : article.nom === this.productName
    );

    if (existingArticle) {
      alert("Cet article existe déjà dans la facture.");
      return;
    }
    
    if (this.articleExiste) {
      if (this.qte < 0 || this.qte > this.selectedProduct.quantite) {
        alert("Veuillez vérifier la quantité");
      } else {
        const article = {
          id: this.selectedProduct.id,
          nom: this.selectedProduct.nom,
          prix: this.selectedProduct.prix,
          quantite: this.qte
        };
        this.articlesFactures.push(article);
        this.calculerSomme();
      }
    } else {
      const isConfirmed = confirm("Êtes-vous sûr de vouloir ajouter cet article (cet article est nouveau)?");
      if (isConfirmed) {
        const article = {
          nom: this.productName,
          prix: this.prix,
          quantite: this.qte
        };
        this.articlesFactures.push(article);
        this.calculerSomme();
      } else {
        console.log("Ajout de l'article annulé.");
      }
    }
  }
  

  calculerSomme() {
    this.facture.prix_total = this.articlesFactures.reduce((sum, article) => sum + (article.prix * article.quantite), 0);
    // Update other properties of facture if needed
  }

 deleteProduct(index: number) {
  this.articlesFactures.splice(index, 1);
  this.calculerSomme();
}

 sustractionStock(productsTable:any[],productName:string,ct:number)
 {
    
 }

 updatestock()
 {
  
 }

 valideFacture()
 {
  this.facture.date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  if(this.typeFacture=="facture")
  {
    if(this.clientExiste)
    {
      this.facture.id_client=this.clientSelected.id
    }
    this.sharedService.addFacture(this.facture).subscribe(
      response => {
        console.log('New facture inserted successfully:', response);
        
        const refFacture=response.ref;
        this.processArticles(refFacture);

        this.loadArticles();

      },
      error => {
        console.error('Error add new facture:', error);
      }
    );


  }else{

  }
 }
 processArticles(refFacture: string) {
  this.articlesFactures.forEach(article => {
    if (article.id) {
      // Article exists in data
      console.log(article)
      this.sharedService.sustractioArticleStock(article.id, article.quantite).subscribe(
        () => {
          this.sharedService.addArticleVendu({
            id_article: article.id,
            ref_facture: refFacture,
            ref_bon_de_livraison: null, // If applicable
            quantite: article.quantite,
            prix_vente: article.prix
          }).subscribe(
            () => {
              console.log('Article vendu added successfully');
            },
            error => {
              console.error('Error adding article vendu:', error);
            }
          );
        },
        error => {
          console.error('Error updating(sustraction) article quantity:', error);
        }
      );
    } else {
      // Article does not exist in data, add it first
      const quantiteAchat=article.quantite;
      article.quantite=-1;
      this.sharedService.addArticle(article).subscribe(
        newArticleResponse => {
          this.sharedService.addArticleVendu({
            id_article: newArticleResponse.id, // Use new article ID
            ref_facture: refFacture,
            ref_bon_de_livraison: null, // If applicable
            quantite: quantiteAchat,
            prix_vente: article.prix
          }).subscribe(
            () => {
              article.quantite=quantiteAchat;
              console.log('Article vendu added successfully');
            },
            error => {
              console.error('Error adding article vendu:', error);
            }
          );
        },
        error => {
          console.error('Error adding new article:', error);
        }
      );
    }

  });
}
}
