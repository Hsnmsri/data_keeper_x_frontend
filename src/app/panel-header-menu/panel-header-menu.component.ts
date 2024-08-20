import { Component, ElementRef, ViewChild } from '@angular/core';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-panel-header-menu',
  standalone: true,
  imports: [],
  templateUrl: './panel-header-menu.component.html',
  styleUrl: './panel-header-menu.component.scss',
})
export class PanelHeaderMenuComponent {
  @ViewChild('profileDropDown') profileDropDown!: ElementRef;
  private resizeObserver!: ResizeObserver;

  isProfileDropDownVisible: boolean = false;
  profileToggleWidth: string | undefined;

  constructor(private appService: AppService) {}

  ngAfterViewInit() {
    this.initResizeObserver();
  }

  initResizeObserver() {
    this.resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target === this.profileDropDown.nativeElement) {
          this.updateProfileDropDownSize(entry.contentRect.width);
        }
      }
    });

    this.resizeObserver.observe(this.profileDropDown.nativeElement);
  }

  updateProfileDropDownSize(width: number) {
    if (window.innerWidth > 992) {
      this.profileToggleWidth = `${width}px`;
    } else {
      this.profileToggleWidth = `${width + 200}px`;
    }
  }

  toggleSideMenuVisibility() {
    this.appService.toggleSideMenu();
  }

  toggleAppListMenuVisibility() {
    this.appService.toggleAppListMenu();
  }
}
