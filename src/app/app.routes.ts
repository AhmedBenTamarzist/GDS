import { Routes } from '@angular/router';
import { AjouterArticlesComponent } from './ajouter-articles/ajouter-articles.component';
import { VenteComponent } from './vente/vente.component';
import { RetourComponent } from './retour/retour.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientInfoComponent } from './client-info/client-info.component';
import { ArticlesComponent } from './articles/articles.component';

export const routes: Routes = [
    {path:'ajouter',component:AjouterArticlesComponent},
    {path:'articles',component:ArticlesComponent},
    {path:'vente',component:VenteComponent},
    {path:'retour',component:RetourComponent},
    {path:'clients',component:ClientsComponent},
    { path: 'client-info/:id', component: ClientInfoComponent },
    { path: 'client-info', component: ClientInfoComponent },
];

