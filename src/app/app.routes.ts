import { Routes } from '@angular/router';
import { GameSnakeComponent } from './game-snake/game-snake.component';
import { PomodoroComponent } from './pomodoro/pomodoro.component';

export const routes: Routes = [
    {path: 'game-snake', component: GameSnakeComponent, pathMatch: 'full'},
    {path: 'pomodoro', component: PomodoroComponent, pathMatch: 'full'}
];
