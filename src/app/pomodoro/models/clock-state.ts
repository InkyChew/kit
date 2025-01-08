import { timer } from "rxjs";
import { Stage } from "./stage";
import { ClockComponent } from "../clock/clock.component";

export interface IClockState {
    component: ClockComponent;
    round: number;
    init(): void;
    nextStage(): void;
    start(): void;
    stop(): void;
}

export abstract class ClockState implements IClockState {
    abstract round: number;
    component: ClockComponent;

    constructor(component: ClockComponent) {
        this.component = component;
    }

    abstract init(): void;
    abstract nextStage(): void;

    start() {
        this.stop();
        this.component.timerSubscription = timer(0, 1000).subscribe(n => {
            this.component.isStart = true;
            if (this.component.milliseconds <= 1000) {
                this.stop();
                this.nextStage();
            }
            this.component.milliseconds -= 1000;
        });
    }

    stop() {
        this.component.isStart = false;
        this.component.timerSubscription?.unsubscribe();
    }
}

export class FocusState extends ClockState {
    round: number = this.component.focusTimes;

    init() {
        this.component.focusTimes > 1 && this.component.clock?.autoStart
            ? this.start() : this.stop();
    }

    nextStage() {
        this.component.updateFocusTimes();
        const stage = this.component.focusTimes % this.component.clock?.interval! > 0
            ? Stage.ShortBreak
            : Stage.LongBreak;
        this.component.nextStage(stage);
    }
}

export class BreakState extends ClockState {
    round: number = this.component.focusTimes - 1;

    init() {
        this.component.clock?.autoStart ? this.start() : this.stop();
    }

    nextStage() {
        this.component.nextStage(Stage.Pomodoro);
    }
}