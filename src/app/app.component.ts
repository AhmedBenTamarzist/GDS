import { Component } from '@angular/core';

import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    SharedModule,
    CommonModule,
    NavbarComponent,
    HttpClientModule // Ensure HttpClientModule is imported
  ],
  providers: [
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GdS-front';
}
