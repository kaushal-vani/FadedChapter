import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'lib-collaborations',
  imports: [CommonModule,RouterModule],
  templateUrl: './collaborations.component.html',
  styleUrl: './collaborations.component.scss',
})
export class CollaborationsComponent {
  constructor(private router: Router){}

  navigateToShop(){
    this.router.navigate(['/shop'])
  }
}
