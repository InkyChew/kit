import { PomodoroComponent } from "../pomodoro.component";

export interface IPageState {
    component: PomodoroComponent;
    color: string;
    init(): void;
    navigateUp(): void;
    navigateDown(): void;
    tabLeft(): void;
    tabRight(): void;
}

export abstract class PageState implements IPageState {
    abstract path: string;
    abstract color: string;
    component: PomodoroComponent;

    constructor(context: PomodoroComponent) {
        this.component = context;
    }

    abstract init(): void;
    abstract navigateUp(): void;
    abstract navigateDown(): void;

    tabLeft() {
        this.navigateTab(-1);
    }

    tabRight() {
        this.navigateTab(1);
    }

    private navigateTab(direction: number) {
        const newTab = (this.component.tab + direction - 1 + 3) % 3 + 1;
        this.component.navigate([this.path, newTab]);
        this.component.tvar += direction;
    }
}

export class ClockPage extends PageState {
    color: string = '';
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
    color: string = '';
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
    color: string = 'skyblue';
    path: string = '/pomodoro/info';

    init() {
        if (!this.component.tab) this.component.tab = 1;
    }

    navigateUp() {
        this.component.navigate(['/pomodoro/setting', this.component.tab]);
        this.component.pvar--;
    }

    navigateDown() {
        this.component.navigate(['/pomodoro/clock', this.component.tab]);
        this.component.pvar++;
    }

    override tabLeft(): void {

    }

    override tabRight(): void {

    }
}