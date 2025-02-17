import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lib-global-nav',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './global-nav.component.html',
  styleUrl: './global-nav.component.css',
})
export class GlobalNavComponent {

  }