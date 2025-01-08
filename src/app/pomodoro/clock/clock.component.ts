import { Component } from '@angular/core';
import { TimePipe } from '../pipes/time.pipe';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Stage } from '../models/stage';
import { ClockService } from '../services/clock.service';
import { SettingService } from '../services/setting.service';
import { IClockSetting } from '../models/clock-setting';
import { IClockState } from '../models/clock-state';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TimePipe],
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.css'
})
export class ClockComponent {
  clockState?: IClockState;
  
  clock?: IClockSetting;
  milliseconds: number = 0;
  focusTimes: number = this._service.getFocusTimes();
  isStart: boolean = false;
  timerSubscription?: Subscription;

  constructor(private _route: ActivatedRoute, public router: Router,
    private _service: ClockService,
    private _settingService: SettingService
  ) {
    this._route.params.subscribe(pms => {
      const stage = +pms['stage'];
      this.getClock(stage);
    });
  }

  getClock(stage: Stage) {
    this.clockState?.stop();
    this._settingService.getClockSetting(stage).subscribe(res => {
      this.clock = res;
      this.milliseconds = this.clock.minute * 60000;
      this.clockState = this._service.createClockState(stage, this);
      this.clockState?.init();
    });
  }

  updateFocusTimes() {
    this._service.setFocusTimes(this.focusTimes++);
  }

  nextStage(stage: Stage) {
    this.router.navigateByUrl(`/pomodoro/${stage}`);
  }
}
