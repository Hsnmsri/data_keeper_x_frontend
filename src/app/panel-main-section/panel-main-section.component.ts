import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-panel-main-section',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './panel-main-section.component.html',
  styleUrl: './panel-main-section.component.scss',
})
export class PanelMainSectionComponent {}
