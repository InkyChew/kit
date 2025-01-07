import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription, timer } from 'rxjs';
import { TimePipe } from './pipes/time.pipe';
import { Stage } from './models/stage';
import { NgClass } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-pomodoro',
  standalone: true,
  imports: [FormsModule, TimePipe, NgClass, RouterLink, RouterLinkActive],
  templateUrl: './pomodoro.component.html',
  styleUrl: './pomodoro.component.css'
})
export class PomodoroComponent {

  stage: Stage = Stage.Pomodoro;
  pomodoro: number = 25;
  shortBreak: number = 5;
  longBreak: number = 15;
  interval: number = 4;

  now: number = 0;
  times: number = 1;
  focusTimes: number = 1;
  breakTimes: number = 1;
  // now: number = this.pomodoro * 60000;
  timer?: Subscription;

  constructor(private _route: ActivatedRoute, private _router: Router) {
    this._route.params.subscribe(pms => {
      this.stage = +pms['stage'];
      this.setStage();
    });
  }

  timerStyle() {
    switch (this.stage) {
      case Stage.Pomodoro:
        return 'pomodoro';
      case Stage.ShortBreak:
        return 'shortBreak';
      case Stage.LongBreak:
        return 'longBreak';
    }
  }

  setStage() {
    switch (this.stage) {
      case Stage.Pomodoro:
        this.now = this.pomodoro * 60000;
        this.times = this.focusTimes;
        break;
      case Stage.ShortBreak:
        this.now = this.shortBreak * 60000;
        this.times = this.breakTimes;
        break;
      case Stage.LongBreak:
        this.now = this.longBreak * 60000;
        this.times = this.breakTimes;
        break;
    }

    this.timer?.unsubscribe();
  }

  nextStage() {
    let nextStage = this.stage;
    switch (this.stage) {
      case Stage.Pomodoro:
        nextStage = this.focusTimes % this.interval > 0
        ? Stage.ShortBreak
        : Stage.LongBreak;
        this.focusTimes++;
        if (this.focusTimes > 2) this.breakTimes++;
        break;
      case Stage.ShortBreak:
      case Stage.LongBreak:
        nextStage = Stage.Pomodoro;
        break;
    }
    this._router.navigateByUrl(`/pomodoro/${nextStage}`);
  }

  trigger() { // start / stop    
    if (this.timer && !this.timer.closed) {
      this.timer.unsubscribe();
      return;
    }
    this.timer = timer(0, 1000).subscribe(n => {
      if (this.now <= 1000) {
        this.timer?.unsubscribe();
        this.nextStage();
      }
      this.now -= 1000;
    });
  }
}