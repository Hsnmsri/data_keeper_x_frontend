import { Component } from '@angular/core';
import { AppService } from '../../services/app.service';
import { UserService } from '../../services/user.service';
import App from '../../models/app.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-panel-app-list-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './panel-app-list-menu.component.html',
  styleUrl: './panel-app-list-menu.component.scss',
})
export class PanelAppListMenuComponent {
  isLoading: boolean = false;
  apps: App[] = [];

  constructor(
    private appService: AppService,
    private userService: UserService
  ) {}

  async ngOnInit() {
    // Subscribe app list
    this.userService.getAppList().subscribe((list) => {
      this.apps = list;
    });

    // Update app list
    if (this.apps.length == 0) {
      await this.userService.updateAppList();
    }
  }
}
