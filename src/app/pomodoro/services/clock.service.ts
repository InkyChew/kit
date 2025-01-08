import { Injectable } from '@angular/core';
import { ClockComponent } from '../clock/clock.component';
import { BreakState, FocusState } from '../models/clock-state';
import { Stage } from '../models/stage';

@Injectable({
  providedIn: 'root'
})
export class ClockService {

  createClockState(stage: Stage, context: ClockComponent) {
    switch (stage) {
      case Stage.Pomodoro:
        return new FocusState(context);
      case Stage.ShortBreak:
      case Stage.LongBreak:
        return new BreakState(context);
    }
  }

  setFocusTimes(times: number) {
    localStorage.setItem("focusTimes", times.toString());
  }

  getFocusTimes(): number {
    return +(localStorage.getItem("focusTimes") ?? 1);
  }
}
