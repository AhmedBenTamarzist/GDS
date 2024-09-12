import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { SharedModule } from '../shared/shared.module';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-bl-info',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './bl-info.component.html',
  styleUrl: './bl-info.component.css'
})
export class BLInfoComponent {

  BLs: any = [];
  currentBLId: number | undefined;
  BL: any;
  selectedBL: any;
  articlesBL: any[] = [];  // Corrected typo

  constructor(private route: ActivatedRoute, private router: Router, private sharedService: SharedService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const BLRef = params.get('ref');
      const BLID = params.get('id');
      if (BLID) {
        this.fetchBLID(BLID);
      } else {
        this.loadAllBLs();
      }
    });
  }

  fetchBLID(BLId: string): void {
    this.sharedService.getBonLivraisonById(BLId).subscribe(BL => {
      this.BL = BL;
      console.log(BL);
      this.sharedService.getArticlesByRefBonDeLivraison(BL.ref).subscribe(articles => {
        this.articlesBL = articles;  // Corrected typo
        console.log(articles);
      });
    });
  }

  
  loadAllBLs(): void {
    this.sharedService.getBonsLivraison().subscribe(BLs => {
      this.BLs = BLs;
    });
  }

  onSelectBL(): void {
    if (this.selectedBL) {

      this.BL=this.selectedBL;
      console.log(this.selectedBL);
      this.sharedService.getArticlesByRefBonDeLivraison(this.BL.ref).subscribe(articles => {
        this.articlesBL = articles;  // Corrected typo
        console.log(articles);
      });
    }
  }
}
