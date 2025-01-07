import { Subscription, timer } from "rxjs";
import { PomodoroComponent } from "../pomodoro.component";
import { Stage } from "./stage";

export interface IClock {
    minute: number,
    milliseconds: number,
    round: number,
    isStart: boolean,
    autoStart: boolean,
    interval?: number,
    color: string,
    timerSubscription?: Subscription;

    nextStage(component?: PomodoroComponent): Stage;
    start(): void;
    stop(): void;
}

export abstract class Clock implements IClock {
    round: number = 1;
    isStart = false;
    autoStart: boolean = false;
    color: string = "#E63946";
    timerSubscription?: Subscription;

    private _minute: number = 25;
    get minute(): number {
        return this._minute;
    }
    set minute(value: number) {
        this._minute = value;
        this.milliseconds = this._minute * 60000;
    }

    milliseconds: number = this._minute * 60000;

    abstract nextStage(component?: PomodoroComponent): Stage;

    start() {
        this.stop();
        this.timerSubscription = timer(0, 1000).subscribe(n => {
            this.isStart = true;
            if (this.milliseconds <= 1000) {
                this.stop();
                this.nextStage();
            }
            this.milliseconds -= 1000;
        });
    }

    stop() {
        this.isStart = false;
        this.timerSubscription?.unsubscribe();
    }
}

export class PomodoroClock extends Clock {
    interval: number = 4;

    nextStage(component: PomodoroComponent) {
        component.focusTimes++;
        component.breakTimes = component.focusTimes - 1;
        return component.focusTimes % this.interval > 0
            ? Stage.ShortBreak
            : Stage.LongBreak;
    }
}

export class ShortBreakClock extends Clock {
    constructor() {
        super();
        this.minute = 5;
        this.color = "#2A9D8F";
    }

    nextStage() {
        return Stage.Pomodoro;
    }
}

export class LongBreakClock extends Clock {
    constructor() {
        super();
        this.minute = 15;
        this.color = "#264653";
    }

    nextStage() {
        return Stage.Pomodoro;
    }
}