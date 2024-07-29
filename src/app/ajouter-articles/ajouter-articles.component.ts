import { Component } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { SharedService } from '../shared.service';
import { Console } from 'node:console';
@Component({
  selector: 'app-ajouter-articles',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './ajouter-articles.component.html',
  styleUrl: './ajouter-articles.component.css'
})
export class AjouterArticlesComponent {
  filteredFrounisseur :any[] =[];
  telFournisseur1:number | undefined ;
  telFournisseur2:number | undefined;
  nomFournisseur:String | undefined;

  filteredAritcles:any[] =[];
  allAritcles:any[] =[];

  articleExiste:boolean=false;

  selectedArticle:any;
  idArticle!:number ;
  nomArticle!:String ;
  prixArticle!:number ;
  qteArticle!:number ;
  prixVenteArticle!: number;
  marqueArticle!: String;
  descArticle!: String;


  dateFacture:String ;
  refFacture:String | undefined;

  articles : any[] = [];


  factureType:boolean=true;
  constructor(private sharedService : SharedService) {
    // Initialize dateFacture with today's date
    this.dateFacture = new Date().toISOString().split('T')[0];
  }

  ngOnInit(): void {

    this.loadArticles();

  }

  loadArticles()
  {
    this.sharedService.getArticles().subscribe((data: any[]) => {
      this.allAritcles = data;
      console.log(this.allAritcles);
    });
  }


  filterFournisseur(event: any) {
    this.articleExiste=false;
  }

  selectFrounisseur(item:any)
  {
    this.nomFournisseur=item.nom;
    this.telFournisseur1=item.tel1;
    this.telFournisseur2=item.tel2;
  }


  filterArticles(event: any) {
    this.articleExiste=false;
    const filterValue = event.target.value.toLowerCase();
    this.filteredAritcles = this.allAritcles.filter(article =>
      (article.nom && article.nom.toLowerCase().includes(filterValue)) ||
      (article.marque && article.marque.toLowerCase().includes(filterValue))
    );
  }

  selectArticle(item:any)
  {
    this.articleExiste=true;
    this.selectedArticle=item;

    this.nomArticle=item.nom;
    this.marqueArticle=item.marque;
    this.descArticle=item.description;
    this.prixVenteArticle=item.prix;
    
  }
  ajouterArticle()
  {

    if(this.articleExiste)
      {
        this.selectedArticle.prix_achat=this.prixArticle;
        this.selectedArticle.description=this.descArticle;
        this.selectedArticle.prix=this.prixVenteArticle;

        const article: { id : number ;nom: String; prix_achat: number; quantite: number; prix: number; marque: String; description: String } = {
          id : this.selectedArticle.id ,
          nom: this.selectedArticle.nom,
          prix: this.prixVenteArticle, // Set default value for price
          quantite: this.qteArticle,  // Set default value for quantity
          prix_achat:this.prixArticle , // Set default value for selling price
          marque: this.selectedArticle.marque || "",  // Set default value for brand (optional)
          description: this.selectedArticle.description || "",   // Set default value for description (optional)
        };
        console.log(article);
        this.articles.push(article);
      }else{
        const isConfirmed = confirm("Êtes-vous sûr de vouloir ajouter ce article (ce article est nouveau)?");
        if (isConfirmed) {
          const article: { nom: String; prix_achat: number; quantite: number; prix: number; marque: String; description: String } = {
            nom: this.nomArticle,
            prix: this.prixVenteArticle, // Set default value for price
            quantite: this.qteArticle,  // Set default value for quantity
            prix_achat:this.prixArticle , // Set default value for selling price
            marque: this.marqueArticle || "",  // Set default value for brand (optional)
            description: this.descArticle || "",   // Set default value for description (optional)
          };
          console.log(article);
          this.articles.push(article);
        } else {
          console.log("Ajout du article annulé.");
        }
      }

  }

  deleteProduct(index: number) {
    if (index > -1) {
      this.articles.splice(index, 1);
    }
  }
  onSubmit()
  {
    if(this.factureType)
      {

      }else{
        const existingArticles = this.articles.filter(article => article.id);
        const newArticles = this.articles.filter(article => !article.id);

    // Update existing articles
    existingArticles.forEach(article => {
      this.sharedService.updateStockArticle(article.id, article).subscribe(
        response => {
          console.log(`Article with id ${article.id} updated successfully:`, response);
          this.loadArticles();
        },
        error => {
          console.error(`Error updating article with id ${article.id}:`, error);
        }
      );
    });

    // Insert new articles
    newArticles.forEach(article => {
      this.sharedService.addArticle(article).subscribe(
        response => {
          console.log('New article inserted successfully:', response);
          this.loadArticles();
        },
        error => {
          console.error('Error inserting new article:', error);
        }
      );
    });
        
      }
      
  }

  showFournisseurDetails(v:boolean)
  {
    this.factureType=v;
  }
}