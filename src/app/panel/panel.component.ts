import { Component } from '@angular/core';
import { PanelSideMenuComponent } from '../panel-side-menu/panel-side-menu.component';
import { PanelHeaderMenuComponent } from '../panel-header-menu/panel-header-menu.component';
import { PanelStatusBarComponent } from '../panel-status-bar/panel-status-bar.component';
import { PanelMainSectionComponent } from '../panel-main-section/panel-main-section.component';
import { PanelAppListMenuComponent } from '../panel-app-list-menu/panel-app-list-menu.component';
import { Subscription } from 'rxjs';
import { AppService } from '../../services/app.service';

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
  isMainContainerVisible: boolean = true;
  private subscription!: Subscription;

  constructor(private appService: AppService) {}

  ngOnInit() {
    // Subscribe to the menu visibility observable
    if (window.innerWidth < 992) {
      this.isSideBarVisible = false;
      if (this.appService.getSideMenuVisibility()) {
        this.appService.toggleSideMenu();
      }
    }
    this.subscription = this.appService
      .getSideMenuVisibility()
      .subscribe((visible) => {
        this.isSideBarVisible = visible;
      });
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
