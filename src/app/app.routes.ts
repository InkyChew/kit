import { Routes } from '@angular/router';
import { GameSnakeComponent } from './game-snake/game-snake.component';
import { PomodoroComponent } from './pomodoro/pomodoro.component';

export const routes: Routes = [
    {path: 'snake', component: GameSnakeComponent, pathMatch: 'full', title: 'snake'},
    {path: 'pomodoro', component: PomodoroComponent, pathMatch: 'full', title: 'Pomodoro'}
];
