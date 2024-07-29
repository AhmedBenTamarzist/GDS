import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent {

  clients:any=[];

  isOpen = false;

  nameClient: string = '';
  telClient1: string = '';
  telClient2: string = '';
  adrClient: string = '';
  
  dtOptions: any = {}

  constructor(private router: Router,private sharedService : SharedService) { }

  ngOnInit(): void {
    this.sharedService.getClients().subscribe((data: any[]) => {
      this.clients = data;
    });

    this.dtOptions = {
      paging: true, // Enable pagination
      ordering: true, // Enable sorting
      // Add other options as needed (refer to documentation)
    };
  }

  toggleCard() {
    this.isOpen = !this.isOpen;
  }


  viewFactures(clientId:number)
  {
//this.clientId = +this.route.snapshot.paramMap.get('id');
  this.router.navigate(['/client-info', clientId]);
  }

  confirmAddClient() {
    const isConfirmed = confirm("Êtes-vous sûr de vouloir ajouter ce client?");
    if (isConfirmed) {
      this.addClient();
    } else {
      console.log("Ajout du client annulé.");
    }
  }

  addClient() {
    const newClient = {
      nom: this.nameClient,
      tel1: this.telClient1,
      tel2: this.telClient2,
      adresse: this.adrClient
    };

    this.sharedService.addClient(newClient).subscribe(
      response => {
        console.log("Client ajouté avec succès", response);
        // Reset form fields

        this.sharedService.getClients().subscribe((data: any[]) => {
          this.clients = data;
        });

        this.nameClient = '';
        this.telClient1 = '';
        this.telClient2 = '';
        this.adrClient = '';
      },
      error => {
        console.error("Erreur lors de l'ajout du client", error);
      }
    );
  }
}
