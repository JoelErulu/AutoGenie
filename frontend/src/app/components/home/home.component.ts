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

  // Handle VIN input changes and delay page navigation
  onVinChange() {
    // Clear any previous timeout to avoid multiple triggers
    clearTimeout(this.timeout);

    // Set a new timeout with a delay (500ms)
    this.timeout = setTimeout(() => {
      if (this.vin) {
        // Delay the page navigation after the VIN is entered
        this.router.navigate(['/vin-details', this.vin]);
      }
    }, 500); // Adjust the delay time (500ms in this case)
  }

  onSubmit(event: Event) {
    event.preventDefault(); // Prevent the form from submitting automatically
  }
}
