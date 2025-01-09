import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { pageTransition, tabTransition } from './transitions/route-transition';
import { filter } from 'rxjs';
import { SettingService } from './services/setting.service';

@Component({
  selector: 'app-pomodoro',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './pomodoro.component.html',
  styleUrl: './pomodoro.component.css',
  animations: [pageTransition, tabTransition]
})
export class PomodoroComponent {

  page: number = 0;
  tab: number = 0;
  color: string = "";

  constructor(private router: Router,
    private _route: ActivatedRoute,
    private _settingService: SettingService) {

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.page = +this._route.firstChild?.snapshot.data['page'];
      this.tab = +this._route.firstChild?.snapshot.params['stage'];
      if(this.tab) {
        this._settingService.getClockSetting(this.tab).subscribe(res => this.color = res.color);
      }
    });
  }
}