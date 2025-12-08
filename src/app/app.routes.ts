import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TimeDisplayComponent } from './time-display/time-display.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'timedisplay', component: TimeDisplayComponent, canActivate: [AuthGuard] }
];
