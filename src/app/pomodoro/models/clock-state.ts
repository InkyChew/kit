import { Subscription, timer } from "rxjs";
import { Stage } from "./stage";
import { ClockComponent } from "../clock/clock.component";
import { IClockSetting } from "./clock-setting";

export interface IClockState {
    component: ClockComponent;
    clock: IClockSetting;
    round: number;
    milliseconds: number;
    isStart: boolean;
    timerSubscription?: Subscription;
    init(): void;
    nextStage(): void;
    start(): void;
    stop(): void;
}

export abstract class ClockState implements IClockState {
    abstract round: number;
    component: ClockComponent;
    clock: IClockSetting;
    milliseconds: number;
    isStart: boolean = false;
    timerSubscription?: Subscription;

    constructor(component: ClockComponent,
        clock: IClockSetting) {
        this.component = component;
        this.clock = clock;
        this.milliseconds = clock.minute * 60000;
    }

    abstract init(): void;
    abstract nextStage(): void;

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

export class FocusState extends ClockState {
    round: number = this.component.focusTimes;

    init() {
        this.component.focusTimes > 1 && this.clock.autoStart
            ? this.start() : this.stop();
    }

    nextStage() {
        this.component.updateFocusTimes();
        const stage = this.component.focusTimes % this.clock.interval! > 0
            ? Stage.ShortBreak
            : Stage.LongBreak;
        this.component.nextStage(stage);
    }
}

export class BreakState extends ClockState {
    round: number = this.component.focusTimes - 1;

    init() {
        this.clock.autoStart ? this.start() : this.stop();
    }

    nextStage() {
        this.component.nextStage(Stage.Pomodoro);
    }
}