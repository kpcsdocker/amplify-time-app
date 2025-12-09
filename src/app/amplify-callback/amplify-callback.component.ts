import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { handleRedirect } from 'aws-amplify/auth';

@Component({
  standalone: true,
  selector: 'app-amplify-callback',
  template: `<p>Signing in...</p>`
})
export class AmplifyCallbackComponent implements OnInit {

  constructor(private router: Router) {}

  async ngOnInit() {
    try {
      // 🔥 This completes the Google/Facebook Hosted UI OAuth flow
      const result = await handleRedirect();

      console.log('OAuth redirect completed:', result);

      this.router.navigate(['/timedisplay']);
    } catch (err) {
      console.error('OAuth callback error:', err);
      this.router.navigate(['/login']);
    }
  }
}
