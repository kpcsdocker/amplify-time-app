import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';

// 🔥 HARD OVERRIDE problematic OAuth keys coming from parseAWSExports
// This prevents Amplify from parsing undefined or empty values.
awsExports.oauth = {
  domain: "timeapp.auth.us-east-1.amazoncognito.com",
  scope: ["openid", "email", "profile"],
  redirectSignIn: "http://localhost:4200/login",
  redirectSignOut: "http://localhost:4200/login",
  responseType: "code"
};

Amplify.configure(awsExports);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
