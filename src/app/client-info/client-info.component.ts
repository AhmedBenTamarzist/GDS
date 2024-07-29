import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-client-info',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './client-info.component.html',
  styleUrl: './client-info.component.css'
})
export class ClientInfoComponent {
  clients:any=[];
  currentClientId: number | undefined ;
  client:any;
  selectedClientId: number | null = null;

  constructor(private route: ActivatedRoute, private router: Router,private sharedService : SharedService) {}
  
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

  
}
