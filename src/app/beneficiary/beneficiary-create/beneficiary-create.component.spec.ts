import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaryCreateComponent } from './beneficiary-create.component';

describe('BeneficiaryCreateComponent', () => {
  let component: BeneficiaryCreateComponent;
  let fixture: ComponentFixture<BeneficiaryCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeneficiaryCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiaryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
