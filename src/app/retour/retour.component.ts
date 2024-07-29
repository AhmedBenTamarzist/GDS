import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-retour',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './retour.component.html',
  styleUrl: './retour.component.css'
})
export class RetourComponent {

  refFacture:String | undefined;
  facture:any;
  refFactureOptions: string[] = ['F000001', 'F000002', 'F000003', 'F000004', 'F000005'];
  filteredFactures:any;
  returnedQte:number[] =[];
  selectedFacture:any;

  filterFactures(event: any) {
    
  }
  selectFacture(facture:any){

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
