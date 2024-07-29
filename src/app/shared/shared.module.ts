import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component'; // Adjust path as per your project structure
import {DataTablesModule} from 'angular-datatables';
@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    DataTablesModule
    
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    DataTablesModule,
    
  ],providers: [
    provideHttpClient(withFetch())
    // other providers
  ]
})
export class SharedModule { }
