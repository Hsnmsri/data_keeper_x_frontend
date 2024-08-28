import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoadingComponent } from './loading/loading.component';
import { ModalComponent } from './modal/modal.component';
import { ToastComponent } from './toast/toast.component';
import { AppService } from '../services/app.service';
import { empty } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoginComponent,
    LoadingComponent,
    ModalComponent,
    ToastComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'data_keeper_x_frontend';
  windowSize: { width: string; height: string };

  constructor(private appService: AppService) {
    // set theme
    let theme: string | null = localStorage.getItem('theme') ?? 'light';
    if (theme == 'light') this.appService.changeTheme('light');
    if (theme == 'dark') this.appService.changeTheme('dark');

    // Init Properties
    this.windowSize = {
      width: `${window.innerWidth}px`,
      height: `${window.innerHeight}px`,
    };

    // Init App
    window.addEventListener('resize', () => {
      this.windowSize = {
        width: `${window.innerWidth}px`,
        height: `${window.innerHeight}px`,
      };
    });
  }
}
