import { Routes } from '@angular/router';
import { GameSnakeComponent } from './game-snake/game-snake.component';
import { PomodoroComponent } from './pomodoro/pomodoro.component';

export const routes: Routes = [
    {path: 'snake', component: GameSnakeComponent, pathMatch: 'full', title: 'snake'},
    {path: 'pomodoro', redirectTo: 'pomodoro/1'},
    {path: 'pomodoro/:stage', component: PomodoroComponent, pathMatch: 'full', title: 'Pomodoro'}
];
