import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../../services/app.service';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import User from '../../models/user.model';
import Role from '../../models/role.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel-header-menu',
  standalone: true,
  imports: [],
  templateUrl: './panel-header-menu.component.html',
  styleUrl: './panel-header-menu.component.scss',
})
export class PanelHeaderMenuComponent implements OnInit {
  @ViewChild('profileDropDown') profileDropDown!: ElementRef;
  private resizeObserver!: ResizeObserver;

  isProfileDropDownVisible: boolean = false;
  profileToggleWidth: string | undefined;

  theme: string = localStorage.getItem('theme') ?? 'light';

  user: User = {
    api_secret: null,
    created_at: null,
    email: null,
    first_name: null,
    id: null,
    last_name: null,
    role_id: null,
    updated_at: null,
  };
  userRole: Role = {
    created_at: null,
    description: null,
    id: null,
    name: null,
    permissions: null,
    updated_at: null,
  };
  private subscriptionUserData!: Subscription;
  private subscriptionUserRole!: Subscription;

  constructor(
    private appService: AppService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // subscribe User
    this.userService.loadUserData();
    this.subscriptionUserData = this.userService
      .getUserData()
      .subscribe((user: User) => {
        this.user = user;
      });
    // subscripte User Role
    this.subscriptionUserData = this.userService
      .getUserRole()
      .subscribe((role: Role) => {
        this.userRole = role;
      });
  }

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

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
    this.appService.alert('Logout Successfully!', 'success');
  }

  changeTheme() {
    let browserTheme = localStorage.getItem('theme') ?? 'light';

    if (browserTheme == 'light') {
      this.theme = 'dark';
      this.appService.changeTheme('dark');
      return;
    }

    if (browserTheme == 'dark') {
      this.theme = 'light';
      this.appService.changeTheme('light');
      return;
    }
  }
}
