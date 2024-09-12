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
  prixAchatArticleHT!:number ;
  qteArticle!:number ;
  prixVenteArticleHT!: number;
  prixVenteArticleTTC!: number;
  TVA!: number;
  marqueArticle!: String;
  descArticle!: String;
  pourcentagedeVente!:number;
  maxPourcentagedeRemise!:number;

  dateFacture:String ;
  refFacture:String | undefined;

  articles : any[] = [];


  factureType?:boolean;
  
  resetVariables(): void {
    this.articleExiste = false;
    this.selectedArticle = null;
    this.idArticle = 0;
    this.nomArticle = '';
    this.prixAchatArticleHT = 0;
    this.qteArticle = 0;
    this.prixVenteArticleHT = 0;
    this.prixVenteArticleTTC = 0;
    this.TVA = 0;
    this.marqueArticle = '';
    this.descArticle = '';
    this.pourcentagedeVente = 0;
    this.maxPourcentagedeRemise = 0;
  }
  
  constructor(private sharedService : SharedService) {
    // Initialize dateFacture with today's date
    this.dateFacture = new Date().toISOString().split('T')[0];
  }

  calculerPrixVente(){
    this.prixVenteArticleHT=(this.prixAchatArticleHT*(this.pourcentagedeVente/100)) +this.prixAchatArticleHT ;
    const pTVA=this.prixAchatTVA()
    this.prixVenteArticleTTC=(pTVA*(this.pourcentagedeVente/100)) +pTVA ;
  }

  prixAchatTVA(): number {
    return (this.TVA / 100) * this.prixAchatArticleHT + this.prixAchatArticleHT;
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
    this.prixVenteArticleTTC=item.prix_vente_ttc;
    this.prixVenteArticleHT=item.prix_vente_ht;
    this.TVA=item.tva;
    this.maxPourcentagedeRemise=item.max_remise;

  }
  
  ajouterArticle() {
    if (this.articleExiste) {
      this.selectedArticle.prix_achat = this.prixAchatArticleHT;
      this.selectedArticle.description = this.descArticle;
      this.selectedArticle.prix_vente_ttc = this.prixVenteArticleTTC;
      this.selectedArticle.prix_vente_ht = this.prixVenteArticleHT;
      this.selectedArticle.tva = this.TVA;
      this.selectedArticle.prix_achat_ht = this.prixAchatArticleHT;
      this.selectedArticle.max_remise = this.maxPourcentagedeRemise;
  
      const article = {
        id: this.selectedArticle.id,
        nom: this.selectedArticle.nom,
        prix_vente_ttc: this.prixVenteArticleTTC, // Updated field name
        quantite: this.qteArticle,  // Set default value for quantity
        prix_achat_ht: this.prixAchatArticleHT, // Updated field name
        marque: this.marqueArticle || "",  // Set default value for brand (optional)
        description: this.descArticle || "",   // Set default value for description (optional)
        prix_vente_ht: this.prixVenteArticleHT, // New field
        tva: this.TVA, // New field
        max_remise: this.maxPourcentagedeRemise // New field
      };
      
      console.log(article);
      this.articles.push(article);
      this.resetVariables();
    } else {
      const isConfirmed = confirm("Êtes-vous sûr de vouloir ajouter cet article (cet article est nouveau)?");
      if (isConfirmed) {
        const article = {
          nom: this.nomArticle,
          prix_vente_ttc: this.prixVenteArticleTTC, // Updated field name
          quantite: this.qteArticle,  // Set default value for quantity
          prix_achat_ht: this.prixAchatArticleHT, // Updated field name
          marque: this.marqueArticle || "",  // Set default value for brand (optional)
          description: this.descArticle || "",   // Set default value for description (optional)
          prix_vente_ht: this.prixVenteArticleHT, // New field
          tva: this.TVA, // New field
          max_remise: this.maxPourcentagedeRemise // New field
        };
        console.log(article);
        this.articles.push(article);
        this.resetVariables();
      } else {
        console.log("Ajout de l'article annulé.");
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
       
      this.articles=[];
      
      }
      
  }

  showFournisseurDetails(v:boolean)
  {
    this.factureType=v;
  }
}