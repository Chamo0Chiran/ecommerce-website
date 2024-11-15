import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatcollectionComponent } from './catcollection.component';

describe('CatcollectionComponent', () => {
  let component: CatcollectionComponent;
  let fixture: ComponentFixture<CatcollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatcollectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatcollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
