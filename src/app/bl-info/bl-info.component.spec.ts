import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BLInfoComponent } from './bl-info.component';

describe('BLInfoComponent', () => {
  let component: BLInfoComponent;
  let fixture: ComponentFixture<BLInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BLInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BLInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
