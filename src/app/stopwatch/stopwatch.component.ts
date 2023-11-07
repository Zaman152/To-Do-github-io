import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.css']
})
export class StopwatchComponent implements OnInit {
  currentTime: string = '00:00:00';
  timer: any;
  isRunning: boolean = false;
  startTime: number = 0;
  elapsedTime: number = 0;

  // Add the formatTime function here
  formatTime(milliseconds: number): string {
    const hours = Math.floor(milliseconds / 3600000);
    milliseconds %= 3600000;
    const minutes = Math.floor(milliseconds / 60000);
    milliseconds %= 60000;
    const seconds = Math.floor(milliseconds / 1000);
    milliseconds %= 1000;
    return (
      this.padTime(hours) +
      ':' +
      this.padTime(minutes) +
      ':' +
      this.padTime(seconds)
    );
  }

  padTime(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }

  start() {
    if (!this.isRunning) {
      this.startTime = Date.now() - this.elapsedTime;
      this.timer = setInterval(() => {
        this.elapsedTime = Date.now() - this.startTime;
        this.currentTime = this.formatTime(this.elapsedTime);
      }, 10);
      this.isRunning = true;
    }
  }

  stop() {
    if (this.isRunning) {
      clearInterval(this.timer);
      this.isRunning = false;
    }
  }

  reset() {
    this.stop();
    this.currentTime = '00:00:00';
    this.elapsedTime = 0;
  }

  ngOnInit() {}
}
