import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SharedService } from '../shared.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-client-info',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './client-info.component.html',
  styleUrl: './client-info.component.css',
  providers: [DatePipe]
})
export class ClientInfoComponent {
  clients:any=[];
  currentClientId: number | undefined ;
  client:any;
  selectedClientId: number | null = null;
  clientFacture:any[]=[];
  clientbonsDeLivraison:any[]=[];

  constructor(private route: ActivatedRoute, private router: Router, private datePipe: DatePipe,private sharedService : SharedService) {}
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const clientId = params.get('id');
      if (clientId) {
        this.fetchClient(clientId);
      } else {
        this.loadAllClients();
      }
    });
  }

  fetchClient(clientId: string): void {
    this.sharedService.getClientById(clientId).subscribe(client => {
      this.client = client;
      this.loadBonsDeLivraison(client.id);
      this.loadFactures(client.id);
    });
  }

  loadAllClients(): void {
    this.sharedService.getClients().subscribe(clients => {
      this.clients = clients;
    });
  }

  onSelectClient(): void {
    if (this.selectedClientId) {
      this.fetchClient(this.selectedClientId.toString());
    }
  }

  loadBonsDeLivraison(client_id:string): void {
    this.sharedService.getBonsDeLivraisonByClientId(client_id).subscribe(
      (data:any[]) => {
        this.clientbonsDeLivraison = data.map(facture => {
          facture.date = this.datePipe.transform(facture.date, 'MMM d, y, h:mm a');
          return facture;
        });
        console.log('Bons de Livraison:', this.clientbonsDeLivraison);
      },
      (error) => {
        console.error('Error fetching bons de livraison:', error);
      }
    );
  }

  loadFactures(client_id:string): void {
    this.sharedService.getFacturesByClientId(client_id).subscribe(
      (data:any[]) => {
        this.clientFacture = data.map(facture => {
          facture.date = this.datePipe.transform(facture.date, 'MMM d, y, h:mm a');
          return facture;
        });
        console.log('Factures:', this.clientFacture);
      },
      (error) => {
        console.error('Error fetching factures:', error);
      }
    );
  }
  
  
  viewDetailBL( id:number ,ref:string ){
    this.router.navigate(['/bl-info',id, ref]);
  //this.clientId = +this.route.snapshot.paramMap.get('id');
  }
  viewDetailFACT( id:number ,ref:string ){
    this.router.navigate(['/facture-info',id, ref]);
  //this.clientId = +this.route.snapshot.paramMap.get('id');
  }
}
