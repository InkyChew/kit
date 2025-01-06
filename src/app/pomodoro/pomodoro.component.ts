import { Component, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription, timer } from 'rxjs';
import { TimePipe } from './pipes/time.pipe';
import { Stage } from './models/stage';

@Component({
  selector: 'app-pomodoro',
  standalone: true,
  imports: [FormsModule, TimePipe],
  templateUrl: './pomodoro.component.html',
  styleUrl: './pomodoro.component.css'
})
export class PomodoroComponent {

  stage: Stage = Stage.Pomodoro;
  pomodoro: number = 25;
  shortBreak: number = 5;
  longBreak: number = 15;
  interval: number = 4;
  now: number = 2000;
  // now: number = this.pomodoro * 60000;
  timer?: Subscription;

  trigger() { // start / stop    
    if (this.timer && !this.timer.closed) {
      this.timer.unsubscribe();
      return;
    }
    this.timer = timer(0, 1000).subscribe(n => { 
      if(this.now <= 1000) this.timer?.unsubscribe();
      this.now -= 1000;
    });
  }
}