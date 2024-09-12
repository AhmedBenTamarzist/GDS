import { Routes } from '@angular/router';
import { AjouterArticlesComponent } from './ajouter-articles/ajouter-articles.component';
import { VenteComponent } from './vente/vente.component';
import { RetourComponent } from './retour/retour.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientInfoComponent } from './client-info/client-info.component';
import { ArticlesComponent } from './articles/articles.component';
import { BonDeLivraisonComponent } from './bon-de-livraison/bon-de-livraison.component';
import { FacturesComponent } from './factures/factures.component';
import { FactureInfoComponent } from './facture-info/facture-info.component';
import { BLInfoComponent } from './bl-info/bl-info.component';
import { DevisComponent } from './devis/devis.component';

export const routes: Routes = [
    {path:'ajouter',component:AjouterArticlesComponent},
    {path:'articles',component:ArticlesComponent},
    {path:'vente',component:VenteComponent},
    {path:'retour',component:RetourComponent},
    {path:'clients',component:ClientsComponent},
    { path: 'client-info/:id', component: ClientInfoComponent },
    { path: 'client-info', component: ClientInfoComponent },
    { path: 'factures', component: FacturesComponent },
    { path: 'bon-de-livraison', component: BonDeLivraisonComponent },
    { path: 'facture-info/:id/:ref', component: FactureInfoComponent },
    { path: 'facture-info', component: FactureInfoComponent },
    { path: 'bl-info/:id/:ref', component: BLInfoComponent },
    { path: 'bl-info', component: BLInfoComponent },
    { path: 'devis', component: DevisComponent },
];

