import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TimeDisplayComponent } from './time-display/time-display.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'time-display', component: TimeDisplayComponent}
];
