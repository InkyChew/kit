import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription, timer } from 'rxjs';
import { TimePipe } from './pipes/time.pipe';
import { Stage } from './models/stage';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SettingComponent } from "./setting/setting.component";
import { IClock, LongBreakClock, PomodoroClock, ShortBreakClock } from './models/clock';

@Component({
  selector: 'app-pomodoro',
  standalone: true,
  imports: [FormsModule, TimePipe, RouterLink, RouterLinkActive, SettingComponent],
  templateUrl: './pomodoro.component.html',
  styleUrl: './pomodoro.component.css'
})
export class PomodoroComponent {

  stage: Stage = Stage.Pomodoro;
  clock: IClock = new PomodoroClock();
  times: number = 1;
  focusTimes: number = 1;
  breakTimes: number = 1;
  timerSubscription?: Subscription;

  constructor(private _route: ActivatedRoute, private _router: Router) {
    this._route.params.subscribe(pms => {
      this.stage = +pms['stage'];
      this.setStage();
    });
  }

  setStage() {
    switch (this.stage) {
      case Stage.Pomodoro:
        this.clock = new PomodoroClock();
        this.times = this.focusTimes;
        break;
      case Stage.ShortBreak:
        this.clock = new ShortBreakClock();
        this.times = this.breakTimes;
        break;
      case Stage.LongBreak:
        this.clock = new LongBreakClock();
        this.times = this.breakTimes;
        break;
    }

    this.timerSubscription?.unsubscribe();
  }

  nextStage() {
    let nextStage = this.stage;
    switch (this.stage) {
      case Stage.Pomodoro:
        nextStage = this.focusTimes % this.clock.interval! > 0
          ? Stage.ShortBreak
          : Stage.LongBreak;
        this.focusTimes++;
        this.breakTimes = this.focusTimes - 1;
        break;
      case Stage.ShortBreak:
      case Stage.LongBreak:
        nextStage = Stage.Pomodoro;
        break;
    }
    this._router.navigateByUrl(`/pomodoro/${nextStage}`);
  }

  trigger() { // start / stop    
    if (this.timerSubscription && !this.timerSubscription.closed) {
      this.timerSubscription.unsubscribe();
      return;
    }
    this.timerSubscription = timer(0, 1000).subscribe(n => {
      if (this.clock.milliseconds <= 1000) {
        this.timerSubscription?.unsubscribe();
        this.nextStage();
      }
      this.clock.milliseconds -= 1000;
    });
  }
}