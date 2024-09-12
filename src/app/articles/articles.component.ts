import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})
export class ArticlesComponent {

  filteredAritcles:any[] =[];
  allAritcles:any[] =[];
  
  constructor(private sharedService : SharedService) {
  
  }

  ngOnInit(): void {

    this.loadArticles();
    
  }

  loadArticles()
  {
    this.sharedService.getArticles().subscribe((data: any[]) => {
      this.allAritcles = data;
      console.log(this.allAritcles);
      this.filteredAritcles=this.allAritcles;
    });
  }
}
