import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-time-display',
  standalone: true,
  templateUrl: './time-display.component.html',
  styleUrls: ['./time-display.component.css']
})
export class TimeDisplayComponent implements OnInit {

  istTime: string = '';
  estTime: string = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {

    // Run the interval only in the browser
    if (isPlatformBrowser(this.platformId)) {
      this.updateTime();
      setInterval(() => this.updateTime(), 1000);
    }
  }

  updateTime() {
    const now = new Date();

    const istDate = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
    this.istTime = istDate.toLocaleTimeString();

    const estDate = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));
    this.estTime = estDate.toLocaleTimeString();
  }
}
