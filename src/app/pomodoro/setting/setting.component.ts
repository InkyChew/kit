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
}
