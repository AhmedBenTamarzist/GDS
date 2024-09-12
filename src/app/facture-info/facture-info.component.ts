import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { SharedModule } from '../shared/shared.module';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-facture-info',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './facture-info.component.html',
  styleUrls: ['./facture-info.component.css']  // Corrected styleUrls
})
export class FactureInfoComponent {

  Factures: any = [];
  currentFactureId: number | undefined;
  Facture: any;
  selectedFacture: any;
  articlesFacture: any[] = [];  // Corrected typo

  constructor(private route: ActivatedRoute, private router: Router, private sharedService: SharedService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const FactureRef = params.get('ref');
      const FactureID = params.get('id');
      if (FactureID) {
        this.fetchFactureID(FactureID);
      } else {
        this.loadAllFactures();
      }
    });
  }

  fetchFactureID(FactureId: string): void {
    this.sharedService.getFactureById(FactureId).subscribe(Facture => {
      this.Facture = Facture;
      console.log(Facture);
      this.sharedService.getArticlesByRefFacture(Facture.ref).subscribe(articles => {
        this.articlesFacture = articles;  // Corrected typo
        console.log(articles);
      });
    });
  }

  
  loadAllFactures(): void {
    this.sharedService.getFactures().subscribe(Factures => {
      this.Factures = Factures;
    });
  }

  onSelectFacture(): void {
    if (this.selectedFacture) {

      this.Facture=this.selectedFacture;
      console.log(this.selectedFacture);
      this.sharedService.getArticlesByRefFacture(this.Facture.ref).subscribe(articles => {
        this.articlesFacture = articles;  // Corrected typo
        console.log(articles);
      });
    }
  }
}
