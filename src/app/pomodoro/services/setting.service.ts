import { Injectable } from '@angular/core';
import { IndexedDbService } from './indexed-db.service';
import { switchMap, of, throwError } from 'rxjs';
import { IClockSetting, LongBreakSetting, PomodoroSetting, ShortBreakSetting } from '../models/clock-setting';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(private _dbService: IndexedDbService) { }

  getClockSetting(id: number) {
    return this._dbService.read(id).pipe(
      switchMap((res) => {
        if (res) {
          return of(res);
        } else {
          return this.postClockSetting(id);
        }
      }),
    );
  }

  postClockSetting(id: number) {
    const clocks = [, new PomodoroSetting(), new ShortBreakSetting(), new LongBreakSetting()];
    const clock = clocks[id];
    if (clock) {
      return this._dbService.create(clock);
    } else {
      return throwError(() => 'Invalid clock ID');
    }
  }

  putClockSetting(clock: IClockSetting) {
    return this._dbService.update(clock);
  }

  getAudioFiles() {
    return [
      { name: 'bell', path: '/assets/pomodoro/bell.mp3' },
      { name: 'ding', path: '/assets/pomodoro/ding.mp3' },
      { name: 'bell-ding', path: '/assets/pomodoro/bell-ding.mp3' },
      { name: 'lofi', path: '/assets/pomodoro/lofi.mp3' },
      { name: 'guitar', path: '/assets/pomodoro/guitar.mp3' },
      { name: 'melody', path: '/assets/pomodoro/melody.mp3' },
    ];
  }

  getColors() {
    return [
      '#E63946',
      '#2A9D8F',
      '#264653'
    ];
  }
}
