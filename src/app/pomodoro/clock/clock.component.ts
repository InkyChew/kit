import { Component } from '@angular/core';
import { TimePipe } from '../pipes/time.pipe';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Stage } from '../models/stage';
import { ClockService } from '../services/clock.service';
import { SettingService } from '../services/setting.service';
import { IClockState } from '../models/clock-state';
import { AudioService } from '../services/audio.service';

@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TimePipe],
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.css'
})
export class ClockComponent {
  clockState?: IClockState;
  focusTimes: number = this._service.getFocusTimes();

  constructor(public router: Router,
    private _service: ClockService,
    private _settingService: SettingService,
    public audioService: AudioService
  ) { }

  ngOnInit() {
    this.clockState?.stop();
    this._settingService.clockSetting.subscribe(res => {
      this.clockState = this._service.createClockState(this, res);
      this.clockState?.init();
    });
  }

  getClock(stage: Stage) {
    this.clockState?.stop();
    this._settingService.getClockSetting(stage).subscribe(res => {
      this.clockState = this._service.createClockState(this, res);
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
