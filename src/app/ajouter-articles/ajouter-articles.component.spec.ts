import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterArticlesComponent } from './ajouter-articles.component';

describe('AjouterArticlesComponent', () => {
  let component: AjouterArticlesComponent;
  let fixture: ComponentFixture<AjouterArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterArticlesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjouterArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
