import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { pageTransition, tabTransition } from './transitions/route-transition';
import { filter } from 'rxjs';
import { SettingService } from './services/setting.service';
import { ClockPage, InfoPage, IPageState, SettingPage } from './models/page-state';

@Component({
  selector: 'app-pomodoro',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './pomodoro.component.html',
  styleUrl: './pomodoro.component.css',
  animations: [pageTransition, tabTransition]
})
export class PomodoroComponent {
  page: number = 1;
  tab: number = 1;
  color: string = "";
  pageState?: IPageState;

  constructor(public _router: Router,
    public _route: ActivatedRoute,
    private _settingService: SettingService) {
    this._router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const snapshot = this._route.firstChild?.snapshot;
      this.page = +snapshot?.data['page'];
      this.setPage();
      this.pageState?.init();
    });
  }

  setPage() {
    switch (this.page) {
      case 1:
        this.pageState = new ClockPage(this);
        break;
      case 2:
        this.pageState = new SettingPage(this);
        break;
      case 3:
        this.pageState = new InfoPage(this);
        break;
    }
  }

  setTab() {
    const snapshot = this._route.firstChild?.snapshot;
    this.tab = +snapshot?.params['stage'];
    this._settingService.getClockSetting(this.tab).subscribe(res => this.color = res.color);
  }

  navigate(commands: any[]) {
    this._router.navigate(commands);
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    let i = this.page;
    switch (event.key) {
      case 'ArrowUp':
        this.pageState?.navigateUp();
        break;
      case 'ArrowDown':
        this.pageState?.navigateDown();
        break;
      case 'ArrowLeft':
        this.pageState?.tabLeft();
        break;
      case 'ArrowRight':
        this.pageState?.tabRight();
        break;
    }
  }
}
