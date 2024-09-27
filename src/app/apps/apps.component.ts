import { Component } from '@angular/core';
import { AppService } from '../../services/app.service';
import { PanelAppListMenuComponent } from '../panel-app-list-menu/panel-app-list-menu.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-apps',
  standalone: true,
  imports: [PanelAppListMenuComponent, RouterOutlet],
  templateUrl: './apps.component.html',
  styleUrl: './apps.component.scss',
})
export class AppsComponent {
  appListVisibility: boolean = false;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    // Subscribe app list visibility
    this.appService.getAppListMenuVisibility().subscribe((visibility) => {
      this.appListVisibility = visibility;
    });

    if (window.innerWidth < 992) {
      if (this.appListVisibility) {
        this.appService.toggleAppListMenu();
      }
    } else {
      if (!this.appListVisibility) {
        this.appService.toggleAppListMenu();
      }
    }
  }

  ngOnDestroy(): void {
    // Hide app list
    if (this.appListVisibility) {
      this.appService.toggleAppListMenu();
    }
  }
}
