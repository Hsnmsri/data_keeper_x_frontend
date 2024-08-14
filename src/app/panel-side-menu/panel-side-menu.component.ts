import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-panel-side-menu',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './panel-side-menu.component.html',
  styleUrl: './panel-side-menu.component.scss'
})
export class PanelSideMenuComponent {

}
