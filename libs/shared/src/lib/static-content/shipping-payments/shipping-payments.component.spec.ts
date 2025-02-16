import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShippingPaymentsComponent } from './shipping-payments.component';

describe('ShippingPaymentsComponent', () => {
  let component: ShippingPaymentsComponent;
  let fixture: ComponentFixture<ShippingPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShippingPaymentsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShippingPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
