import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, FormsModule]  
})
export class HomeComponent {
  vin: string = ''; 
  timeout: any;

  constructor(private router: Router) {}

  onVinChange() {
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      if (this.vin) {
        this.router.navigate(['/vin-details', this.vin]);
      }
    }, 500);
  }

  onSubmit(event: Event) {
    event.preventDefault(); 
  }
}
