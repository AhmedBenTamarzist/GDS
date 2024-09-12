import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class SharedService {
  private clientsUrl = 'http://localhost:3000/api/clients';
  private articlesUrl = 'http://localhost:3000/api/articles';
  private facturesUrl = 'http://localhost:3000/api/factures';
  private bonsLivraisonUrl = 'http://localhost:3000/api/bons-de-livraison';
  private articlesVenduUrl = 'http://localhost:3000/api/articles_vendu';

  constructor(private http: HttpClient) {}

  // Clients
  getClients(): Observable<any[]> {
    return this.http.get<any[]>(this.clientsUrl);
  }
  rechercherClients(client:string):Observable<any[]>{
    return this.http.get<any[]>(`${this.clientsUrl}/recherche/${client}`);
  }

  getDevis(id: string, dateDebut: Date | null, dateFin: Date | null, facture: boolean, bl: boolean): Observable<any[]> {
    let body;
    
     body = {
      dateDebut: dateDebut, 
      dateFin: dateFin,
      facture: facture,
      bl: bl
    };
    
  
    return this.http.post<any[]>(`${this.clientsUrl}/devis/${id}`, body);
  }
  

  getClientById(id: string): Observable<any> {
    return this.http.get<any>(`${this.clientsUrl}/${id}`);
  }

  addClient(client: any): Observable<any> {
    return this.http.post<any>(this.clientsUrl, client);
  }

  updateClient(id: string, client: any): Observable<any> {
    return this.http.put<any>(`${this.clientsUrl}/${id}`, client);
  }

  deleteClient(id: string): Observable<any> {
    return this.http.delete<any>(`${this.clientsUrl}/${id}`);
  }

  // Articles
  getArticles(): Observable<any[]> {
    return this.http.get<any[]>(this.articlesUrl);
  }

  getArticleById(id: string): Observable<any> {
    return this.http.get<any>(`${this.articlesUrl}/${id}`);
  }

  addArticle(article: any): Observable<any> {
    return this.http.post<any>(this.articlesUrl, article);
  }

  updateArticle(id: string, article: any): Observable<any> {
    return this.http.put<any>(`${this.articlesUrl}/${id}`, article);
  }

  deleteArticle(id: string): Observable<any> {
    return this.http.delete<any>(`${this.articlesUrl}/${id}`);
  }

  updateStockArticle(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.articlesUrl}/updateStock/${id}`, data);
  }

  sustractioArticleStock(id:string, quantite:number): Observable<any>{
    const data={quantite:quantite};
    return this.http.put<any>(`${this.articlesUrl}/sustractioStock/${id}`, data);
  }
  // Factures
  getFactures(): Observable<any[]> {
    return this.http.get<any[]>(this.facturesUrl);
  }

  getFactureById(id: string): Observable<any> {
    return this.http.get<any>(`${this.facturesUrl}/${id}`);
  }

  addFacture(facture: any): Observable<any> {
    return this.http.post<any>(`${this.facturesUrl}/addFacture`, facture);
  }

  updateFacture(id: string, facture: any): Observable<any> {
    return this.http.put<any>(`${this.facturesUrl}/${id}`, facture);
  }

  deleteFacture(id: string): Observable<any> {
    return this.http.delete<any>(`${this.facturesUrl}/${id}`);
  }

  // Function to get factures by client_id
  getFacturesByClientId(client_id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.facturesUrl}/client/${client_id}`);
  }

  // Bons de Livraison
  getBonsLivraison(): Observable<any[]> {
    return this.http.get<any[]>(this.bonsLivraisonUrl);
  }

  getBonLivraisonById(id: string): Observable<any> {
    return this.http.get<any>(`${this.bonsLivraisonUrl}/${id}`);
  }

  addBonLivraison(bonLivraison: any): Observable<any> {
    return this.http.post<any>(`${this.bonsLivraisonUrl}/addBL`, bonLivraison);
  }

  updateBonLivraison(id: string, bonLivraison: any): Observable<any> {
    return this.http.put<any>(`${this.bonsLivraisonUrl}/${id}`, bonLivraison);
  }

  deleteBonLivraison(id: string): Observable<any> {
    return this.http.delete<any>(`${this.bonsLivraisonUrl}/${id}`);
  }

  // Function to get bons_de_livraison by client_id
  getBonsDeLivraisonByClientId(client_id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.bonsLivraisonUrl}/client/${client_id}`);
  }

  //articles_vendu
  // Create a new article vendu
  addArticleVendu(articleVendu: any): Observable<any> {
    return this.http.post<any>(this.articlesVenduUrl, articleVendu);
  }

  // Get all articles vendu
  getAllArticlesVendu(): Observable<any[]> {
    return this.http.get<any[]>(this.articlesVenduUrl);
  }

  // Get a specific article vendu by ID
  getArticleVenduById(id: number): Observable<any> {
    return this.http.get<any>(`${this.articlesVenduUrl}/${id}`);
  }

  // Update an article vendu
  updateArticleVendu(id: number, articleVendu: any): Observable<any> {
    return this.http.put<any>(`${this.articlesVenduUrl}/${id}`, articleVendu);
  }

  // Delete an article vendu
  deleteArticleVendu(id: number): Observable<any> {
    return this.http.delete<any>(`${this.articlesVenduUrl}/${id}`);
  }

  // Get articles by reference facture
  getArticlesByRefFacture(ref_facture: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.articlesVenduUrl}/facture/${ref_facture}`);
  }

  // Get articles by reference bon de livraison
  getArticlesByRefBonDeLivraison(ref_bon_de_livraison: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.articlesVenduUrl}/bon_de_livraison/${ref_bon_de_livraison}`);
  }

  getFactureAndBLbyRef(ref:string): Observable<any[]> {
    return this.http.get<any[]>(`${this.facturesUrl}/searchFactBl/${ref}`);
  }
}
