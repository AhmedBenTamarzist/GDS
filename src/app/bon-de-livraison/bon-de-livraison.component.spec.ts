import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonDeLivraisonComponent } from './bon-de-livraison.component';

describe('BonDeLivraisonComponent', () => {
  let component: BonDeLivraisonComponent;
  let fixture: ComponentFixture<BonDeLivraisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BonDeLivraisonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BonDeLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
