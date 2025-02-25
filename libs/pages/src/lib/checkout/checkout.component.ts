// checkout.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CartItem, CartService } from '@faded-chapter/shared';
import { Observable } from 'rxjs';


@Component({
  selector: 'lib-checkout',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  steps = ['Personal', 'Shipping', 'Payment', 'Confirmation'];
  currentStep = 1;
  cartItems$!: Observable<CartItem[]>; // ✅ Fix: Declare but initialize in ngOnInit()

  personalForm!: FormGroup;
  shippingForm!: FormGroup;
  paymentForm!: FormGroup;

  constructor(private fb: FormBuilder, private cartService: CartService) {} // ✅ cartService is initialized here

  ngOnInit() {
    this.cartItems$ = this.cartService.cartItems$; // ✅ Now it's safe to use cartService

    this.initializeForms();
  }

  initializeForms() {
    this.personalForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });

    this.shippingForm = this.fb.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
    });

    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.minLength(16)]],
      expiry: ['', Validators.required],
    });
  }

  nextStep() {
    if (this.currentStep < this.steps.length) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  submitOrder() {
    alert('Order placed successfully!');
    this.currentStep = 4;
  }

  restartCheckout() {
    this.currentStep = 1;
    this.personalForm.reset();
    this.shippingForm.reset();
    this.paymentForm.reset();
  }
}