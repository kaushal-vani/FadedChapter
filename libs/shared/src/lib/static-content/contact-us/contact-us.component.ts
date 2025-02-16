import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormsModule } from '@angular/forms';

@Component({
  selector: 'lib-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
  imports: [FormsModule, CommonModule],
})
export class ContactUsComponent {
  formData = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  onSubmit() {
    if (this.formData.name && this.formData.email && this.formData.message) {
      console.log('Form Submitted:', this.formData);
      alert('Thank you for contacting us!');
      this.formData = { name: '', email: '', subject: '', message: '' }; // Reset form
    }
  }

  markTouched(control: AbstractControl) {
    control.markAsTouched();
  }
}
