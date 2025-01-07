import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  focusTimes: number = 1;
  breakTimes: number = 1;

  constructor(private _route: ActivatedRoute, public router: Router) {
    this._route.params.subscribe(pms => {
      this.stage = +pms['stage'];
      this.setStage();
    });
  }

  setStage() {
    switch (this.stage) {
      case Stage.Pomodoro:
        this.clock = new PomodoroClock();
        this.clock.round = this.focusTimes;
        break;
      case Stage.ShortBreak:
        this.clock = new ShortBreakClock();
        this.clock.round = this.breakTimes;
        break;
      case Stage.LongBreak:
        this.clock = new LongBreakClock();
        this.clock.round = this.breakTimes;
        break;
    }

    this.clock.timerSubscription?.unsubscribe();
  }

  nextStage() {
    const nextStage = this.clock.nextStage(this);
    this.router.navigateByUrl(`/pomodoro/${nextStage}`);
  }
}