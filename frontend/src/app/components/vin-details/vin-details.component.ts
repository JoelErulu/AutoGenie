import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/services';
import { CommonModule } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


@Component({
  standalone: true,
  selector: 'app-vin-details',
  templateUrl: './vin-details.component.html',
  styleUrls: ['./vin-details.component.css'],
  imports: [CommonModule]
})
export class VinDetailsComponent implements OnInit {
  vin: string | null = '';
  vinData: any = null;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.vin = params['vin'];
      if (this.vin) {
        this.fetchCarDetails(this.vin);
      }
    });
  }

  fetchCarDetails(vin: string): void {
    this.apiService.getCarDetails(vin).subscribe(
      data => {
        this.vinData = data;
        if (!this.vinData && isPlatformBrowser(this.platformId)) {
          window.location.reload(); 
        }
      },
      error => {
        this.errorMessage = 'Error fetching VIN details.';
        if (isPlatformBrowser(this.platformId)) {
          window.location.reload(); 
        }
      }
    );
  }
}
