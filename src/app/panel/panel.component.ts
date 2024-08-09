import { Component } from '@angular/core';
import { PanelSideMenuComponent } from "../panel-side-menu/panel-side-menu.component";
import { PanelHeaderMenuComponent } from "../panel-header-menu/panel-header-menu.component";
import { PanelStatusBarComponent } from "../panel-status-bar/panel-status-bar.component";
import { PanelMainSectionComponent } from "../panel-main-section/panel-main-section.component";
import { PanelAppListMenuComponent } from "../panel-app-list-menu/panel-app-list-menu.component";

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [PanelSideMenuComponent, PanelHeaderMenuComponent, PanelStatusBarComponent, PanelMainSectionComponent, PanelAppListMenuComponent],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent {

}
