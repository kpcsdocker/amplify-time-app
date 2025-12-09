import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { signIn, fetchAuthSession } from 'aws-amplify/auth';
import { signInWithRedirect } from 'aws-amplify/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  isCheckingAuth = true;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.handleRedirectAfterGoogle();
  }

  async login() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
  
    try {
      let user: any = await signIn({ username: email, password });
  
      // Handle NEW PASSWORD REQUIRED
      if (user.nextStep?.signInStep === 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED') {
        const newPassword = prompt('Enter new password:');
        if (!newPassword) return;
  
        user = await user.nextStep.completeNewPassword(
          newPassword,
          user.nextStep.missingAttributes || {}
        );
      }
  
      // Direct success without challenge
      if (user.nextStep?.signInStep === 'DONE') {
        // Don't force refresh → much faster
        await fetchAuthSession();
  
        // Fast redirect
        this.router.navigate(['/timedisplay']);
        return;
      }
  
    } catch (err: any) {
      console.error(err);
      alert('Login failed: ' + err.message);
    }
  }

  // loginWithGoogle() {
  //   signInWithRedirect({ provider: 'Google' });
  // }

  async loginWithGoogle() {
    try {
      // Check if user already has a valid session
      const session = await fetchAuthSession();
  
      const isLoggedIn =
        session?.tokens?.idToken || session?.tokens?.accessToken;
  
      if (isLoggedIn) {
        // User already logged in → redirect directly
        this.router.navigate(['/timedisplay']);
      } else {
        // Not logged in → start Google redirect flow
        signInWithRedirect({ provider: 'Google' });
      }
    } catch (error) {
      // No session → start login
      signInWithRedirect({ provider: 'Google' });
    }
  }
  
  async handleRedirectAfterGoogle() {
    try {
      const session = await fetchAuthSession();
      const isLoggedIn =
        session?.tokens?.idToken || session?.tokens?.accessToken;
  
      if (isLoggedIn) {
        // User has returned from Google login → go to timedisplay
        this.router.navigate(['/timedisplay']);
      }
    } catch (err) {
      // Not logged in yet → stay on login page
    }
    this.isCheckingAuth = false;
  }
  
}
