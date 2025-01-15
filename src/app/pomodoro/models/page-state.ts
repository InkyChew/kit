import { PomodoroComponent } from "../pomodoro.component";

export interface IPageState {
    component: PomodoroComponent;
    init(): void;
    navigateUp(): void;
    navigateDown(): void;
    tabLeft(): void;
    tabRight(): void;
}

export abstract class PageState implements IPageState {
    abstract path: string;
    component: PomodoroComponent;

    constructor(context: PomodoroComponent) {
        this.component = context;
    }

    abstract init(): void;
    abstract navigateUp(): void;
    abstract navigateDown(): void;

    tabLeft() {
        const tab = this.component.tab == 1 ? 3 : this.component.tab - 1;
        this.component.navigate([this.path, tab]);
        this.component.tvar--;
    }

    tabRight() {
        const tab = this.component.tab == 3 ? 1 : this.component.tab + 1;
        this.component.navigate([this.path, tab]);
        this.component.tvar++;
    }
}

export class ClockPage extends PageState {
    path: string = '/pomodoro/clock';

    init() {
        this.component.setTab();
    }

    navigateUp() {
        this.component.navigate(['/pomodoro/info']);
        this.component.pvar--;
    }

    navigateDown() {
        this.component.navigate(['/pomodoro/setting', this.component.tab]);
        this.component.pvar++;
    }
}

export class SettingPage extends PageState {
    path: string = '/pomodoro/setting';

    init() {
        this.component.setTab();
    }

    navigateUp() {
        this.component.navigate(['/pomodoro/clock', this.component.tab]);
        this.component.pvar--;
    }

    navigateDown() {
        this.component.navigate(['/pomodoro/info']);
        this.component.pvar++;
    }
}

export class InfoPage extends PageState {
    pvar: number = 3;
    path: string = '/pomodoro/info';

    init() {
        if (!this.component.tab) this.component.tab = 1;
        this.component.color = 'skyblue';
    }

    navigateUp() {
        this.component.navigate(['/pomodoro/setting', this.component.tab]);
        this.component.pvar--;
    }

    navigateDown() {
        this.component.navigate(['/pomodoro/clock', this.component.tab]);
        this.component.pvar++;
    }
}