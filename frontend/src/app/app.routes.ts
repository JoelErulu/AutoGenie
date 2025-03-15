import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { VinDetailsComponent } from './components/vin-details/vin-details.component';

export const routes: Routes = [
    { path: '', component: HomeComponent }, 
    { path: 'vin-details/:vin', component: VinDetailsComponent },
];