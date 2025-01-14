import { Routes } from '@angular/router';
import { GameSnakeComponent } from './game-snake/game-snake.component';
import { PomodoroComponent } from './pomodoro/pomodoro.component';
import { ClockComponent } from './pomodoro/clock/clock.component';
import { SettingComponent } from './pomodoro/setting/setting.component';
import { KitComponent } from './kit/kit.component';
import { InfoComponent } from './pomodoro/info/info.component';

export const routes: Routes = [
    { path: '', component: KitComponent, pathMatch: 'full' },
    { path: 'snake', component: GameSnakeComponent, pathMatch: 'full', title: 'snake' },
    {
        path: 'pomodoro', component: PomodoroComponent, title: 'Pomodoro',
        children: [
            { path: '', redirectTo: 'clock/1', pathMatch: 'full' },
            { path: 'clock/:stage', component: ClockComponent, pathMatch: 'full', data: { page: 1 } },
            { path: 'setting/:stage', component: SettingComponent, pathMatch: 'full', data: { page: 2 } },
            { path: 'info', component: InfoComponent, pathMatch: 'full', data: { page: 3 } }
        ]
    },
];
