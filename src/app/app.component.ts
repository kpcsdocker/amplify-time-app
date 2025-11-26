import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TimeDisplayComponent } from './time-display/time-display.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,TimeDisplayComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'amplify-time-app';
}
