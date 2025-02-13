import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GlobalNavComponent } from '@faded-chapter/shared';

@Component({
  imports: [ GlobalNavComponent ,RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'store';
}
