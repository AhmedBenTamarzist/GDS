import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import { SharedModule } from '../shared/shared.module';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-factures',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './factures.component.html',
  styleUrl: './factures.component.css',
  providers: [DatePipe]
})
export class FacturesComponent {

  allFactures:any[]=[];
  filteredFactures:any[]=[];
  
  
  constructor(private sharedService : SharedService , private datePipe: DatePipe,private router: Router){}
  
  ngOnInit(): void {

    this.loadFactures();
    
  }

  loadFactures(): void {
    this.sharedService.getFactures().subscribe(
      (data: any[]) => {
        // Format the date for each article
        this.allFactures = data.map(facture => {
          facture.date = this.datePipe.transform(facture.date, 'MMM d, y, h:mm a');
          return facture;
        });
        this.filteredFactures = this.allFactures; 
        console.log(this.allFactures);
      },
      (error) => {
        console.error('Error loading articles:', error);
      }
    );
  }


  viewDetail( id:number ,ref:string ){
    this.router.navigate(['/facture-info',id, ref]);
  //this.clientId = +this.route.snapshot.paramMap.get('id');
  }
  
}
