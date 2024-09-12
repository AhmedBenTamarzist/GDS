import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

interface Devis {
  total: number;
  dateDebut: Date | null;
  dateFin: Date | null;
  client: any;
  articles:any[];
  remise:number;
}
@Component({
  selector: 'app-devis',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './devis.component.html',
  styleUrl: './devis.component.css',
  providers: [DatePipe]
})
export class DevisComponent {

  constructor(private sharedService : SharedService ,private router: Router){}
  
  nameclient:string ="";
  clients:any=[];
  clientSelected:any=null;
  messageError="";
  dateDebut: Date | null = null;
  dateFin: Date | null = null;

  isBonDeLivraison: boolean = false;
  isFacture: boolean = false;

  devis :Devis|null = null;
  articles:any=[];
  onRechercher()
  {
    this.sharedService.rechercherClients(this.nameclient).subscribe((data: any[]) => {
      this.clients = data;
      console.log(data);
    });
  }

  selectClient(client:any)
  {
    this.clientSelected=client;
    this.nameclient=client.nom
    this.devis=null;
  }

  verifDate():boolean
  {
    if(this.dateDebut && this.dateFin)
    {
      if(this.dateFin<this.dateDebut){
        this.messageError="verif la date de debut et fin"
        return false;
      }
      this.messageError=""
      return true;
    }else {
      this.messageError="entre la date de debut et fin"
      return false;
    }
  }

  chargerDevis()
  {
    this.devis=null;
    
    if (this.clientSelected && this.messageError!="attende" )
    {
      
      if (this.verifDate())
        {
          if( this.isBonDeLivraison || this.isFacture && (this.dateDebut && this.dateFin))
          {
            this.messageError="attende"
           
            this.sharedService.getDevis(this.clientSelected.id,this.dateDebut,this.dateFin,this.isFacture,this.isBonDeLivraison).subscribe((data:any[])=>{

              this.articles=data;
              console.log(data)
              this.devis ={total:0,articles:data , client:this.clientSelected , dateDebut:this.dateDebut , dateFin:this.dateFin , remise:0}
               this.messageError="";
            },(error)=>{
               this.messageError="il ya un probleme "
              console.error('Error to get devis : :', error);
            });



            
          }else 
          {
            this.messageError="select Facture or Bon de livraison"
          }
          


      }
    }else{
      this.messageError="select client "
    }
  }
}
