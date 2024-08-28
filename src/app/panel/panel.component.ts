import { Component } from '@angular/core';
import { PanelSideMenuComponent } from '../panel-side-menu/panel-side-menu.component';
import { PanelHeaderMenuComponent } from '../panel-header-menu/panel-header-menu.component';
import { PanelStatusBarComponent } from '../panel-status-bar/panel-status-bar.component';
import { PanelMainSectionComponent } from '../panel-main-section/panel-main-section.component';
import { PanelAppListMenuComponent } from '../panel-app-list-menu/panel-app-list-menu.component';
import { Subscription } from 'rxjs';
import { AppService } from '../../services/app.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [
    PanelSideMenuComponent,
    PanelHeaderMenuComponent,
    PanelStatusBarComponent,
    PanelMainSectionComponent,
    PanelAppListMenuComponent,
  ],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
})
export class PanelComponent {
  isSideBarVisible: boolean = true;
  isAppListVisible: boolean = true;

  private subscriptionSideMenu!: Subscription;
  private subscriptionAppListMenu!: Subscription;

  constructor(
    private appService: AppService,
    private router: Router,
    private userService: UserService
  ) {
    this.userService = new UserService();
  }

  async ngOnInit() {
    // Verify Access Token
    if (localStorage.getItem('token') == null) {
      this.router.navigate(['/login']);
      return;
    }
    if (!(await this.userService.verifyAccessToken())) {
      this.appService.alert('Token Expired!', 'danger');
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
      return;
    }

    // Get user data
    if (!(await this.userService.loadUserData())) {
      this.appService.alert('Sync User Data Failed!', 'danger');
      this.router.navigate(['/login']);
      return;
    }
    // Get user role
    await this.userService.loadUserRole();

    // Subscribe to the menu visibility observable
    if (window.innerWidth < 992) {
      this.isSideBarVisible = false;
      if (this.appService.getSideMenuVisibility()) {
        this.appService.toggleSideMenu();
      }
    }
    this.subscriptionSideMenu = this.appService
      .getSideMenuVisibility()
      .subscribe((visible) => {
        this.isSideBarVisible = visible;
      });

    // Subscribe to the app list menu visibility observable
    if (window.innerWidth < 992) {
      this.isAppListVisible = false;
      if (this.appService.getAppListMenuVisibility()) {
        this.appService.toggleAppListMenu();
      }
    }
    this.subscriptionAppListMenu = this.appService
      .getAppListMenuVisibility()
      .subscribe((visible) => {
        this.isAppListVisible = visible;
      });
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    if (this.subscriptionSideMenu) {
      this.subscriptionSideMenu.unsubscribe();
    }
    if (this.subscriptionAppListMenu) {
      this.subscriptionAppListMenu.unsubscribe();
    }
  }
}
