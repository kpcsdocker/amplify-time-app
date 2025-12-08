import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { getCurrentUser } from 'aws-amplify/auth';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  async canActivate(): Promise<boolean> {
    try {
      await getCurrentUser();  // Fast check
      return true;
    } catch {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
