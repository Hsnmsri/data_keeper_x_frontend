import { Component } from '@angular/core';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-panel-header-menu',
  standalone: true,
  imports: [],
  templateUrl: './panel-header-menu.component.html',
  styleUrl: './panel-header-menu.component.scss'
})
export class PanelHeaderMenuComponent {

  constructor(private appService: AppService){}

  toggleSideMenuVisibility(){
    this.appService.toggleSideMenu();
  }

  toggleAppListMenuVisibility(){
    this.appService.toggleAppListMenu();
  }
}
