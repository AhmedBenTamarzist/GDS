import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SharedService } from '../shared.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-retour',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './retour.component.html',
  styleUrl: './retour.component.css',
  providers: [DatePipe]

})
export class RetourComponent {

  refFacture:string | undefined;
  facture:any;
  filteredFactures:any;
  returnedQte:number[] =[];
  selectedFacture:any=null;


  constructor(private sharedService :SharedService,private datePipe: DatePipe){

  }


 
  isLoading =false;
  filterFactures() 
  {
    
    if(this.refFacture){
      this.isLoading=true;
      this.sharedService.getFactureAndBLbyRef(this.refFacture).subscribe(
      (data:any[])=>{
        this.filteredFactures=data.map(facture => {
          facture.date = this.datePipe.transform(facture.date, 'd, MM, y, h:mm a');
          return facture;
        });
        console.log(data);
        this.isLoading=false;
      },
      (error)=> {
        this.isLoading=false;
        console.error("error Loading factures and bls",error)}
    );
      
  }
    
  }


  selectFacture(facture:any){
    this.selectedFacture=facture
    if(facture.type=="facture"){
      this.sharedService.getArticlesByRefFacture(facture.ref).subscribe((data:any[])=>
      {
        this.selectedFacture.articles=data;
      },
        (error)=>{console.error("Error loading articles",error)}
      );
    }else if(facture.type=="bl"){
      //type : bl
      this.sharedService.getArticlesByRefBonDeLivraison(facture.ref).subscribe((data:any[])=>
        {
          this.selectedFacture.articles=data;
        },
          (error)=>{console.error("Error loading articles",error)}
        );

    }
  }

  
  validateQuantity(event: any,max:number) {
    const inputValue = event.target.value;
    if (inputValue > max) {
      event.target.value = max;
    } else if (inputValue < 0) {
      event.target.value = 0;
    }
  }


  handleRetour(article:any, qte:number)
  {

  }
  
  onSubmit()
  {

  }
}
