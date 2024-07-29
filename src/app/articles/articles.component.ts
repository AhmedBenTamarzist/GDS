import { Component } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})
export class ArticlesComponent {

  filteredAritcles:any[] =[];
  allAritcles:any[] =[];
  
  constructor(private sharedService : SharedService) {
    // Initialize dateFacture with today's date
  }

  ngOnInit(): void {

    this.loadArticles();

  }

  loadArticles()
  {
    this.sharedService.getArticles().subscribe((data: any[]) => {
      this.allAritcles = data;
      console.log(this.allAritcles);
    });
  }
}
