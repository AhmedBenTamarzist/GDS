import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-bon-de-livraison',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './bon-de-livraison.component.html',
  styleUrl: './bon-de-livraison.component.css',
  providers: [DatePipe]
})



export class BonDeLivraisonComponent {

  allBLs:any[]=[];
  filteredBLs:any[]=[];
  
  
  constructor(private sharedService : SharedService , private datePipe: DatePipe,private router: Router){}
  
  ngOnInit(): void {

    this.loadFactures();
    
  }

  loadFactures(): void {
    this.sharedService.getBonsLivraison().subscribe(
      (data: any[]) => {
        // Format the date for each article
        this.allBLs = data.map(facture => {
          facture.date = this.datePipe.transform(facture.date, 'MMM d, y, h:mm a');
          return facture;
        });
        this.filteredBLs = this.allBLs; 
        console.log(this.allBLs);
      },
      (error) => {
        console.error('Error loading bon-de-livraison:', error);
      }
    );
  }


  viewDetail( id:number ,ref:string ){
    this.router.navigate(['/bl-info',id, ref]);
  //this.clientId = +this.route.snapshot.paramMap.get('id');
  }
  

}
