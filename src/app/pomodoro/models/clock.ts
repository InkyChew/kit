export interface IClock {
    minute: number,
    milliseconds: number,
    autoStart: boolean,
    interval?: number
    color: string
}

export class Clock implements IClock {
    autoStart: boolean = false;
    color: string = "#E63946";

    private _minute: number = 25;
    get minute(): number {
        return this._minute;
    }
    set minute(value: number) {
        this._minute = value;
        this.milliseconds = this._minute * 60000;
    }

    milliseconds: number = this._minute * 60000;
}

export class PomodoroClock extends Clock {
    interval: number = 4;
}

export class ShortBreakClock extends Clock {
    constructor() {
        super();
        this.minute = 5;
        this.color = "#2A9D8F";
    }
}

export class LongBreakClock extends Clock {
    constructor() {
        super();
        this.minute = 15;
        this.color = "#264653";
    }
}