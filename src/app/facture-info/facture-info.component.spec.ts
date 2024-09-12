import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureInfoComponent } from './facture-info.component';

describe('FactureInfoComponent', () => {
  let component: FactureInfoComponent;
  let fixture: ComponentFixture<FactureInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactureInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FactureInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
