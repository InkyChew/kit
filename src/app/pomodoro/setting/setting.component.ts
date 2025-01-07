import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IClock } from '../models/clock';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent {
  @Input({ required: true }) clock!: IClock;
  @Output() onChanged = new EventEmitter<IClock>();
  audioPlayer?: HTMLAudioElement;

  audioFiles = [
    { name: 'bell', path: '/assets/pomodoro/bell.mp3' },
    { name: 'ding', path: '/assets/pomodoro/ding.mp3' },
    { name: 'bell-ding', path: '/assets/pomodoro/bell-ding.mp3' },
    { name: 'lofi', path: '/assets/pomodoro/lofi.mp3' },
    { name: 'guitar', path: '/assets/pomodoro/guitar.mp3' },
    { name: 'melody', path: '/assets/pomodoro/melody.mp3' },
  ];

  colors = [
    '#E63946',
    '#2A9D8F',
    '#264653'
  ]

  ngOnInit() {
  }

  playAudio() {
    if (this.audioPlayer)
      this.audioPlayer.pause();
    this.audioPlayer = new Audio(this.clock.sound);
    this.audioPlayer.play();
  }

  ngOnDestroy() {
    this.audioPlayer?.pause();
    this.audioPlayer = undefined;
  }
}
