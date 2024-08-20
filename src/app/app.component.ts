import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoadingComponent } from './loading/loading.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'data_keeper_x_frontend';
  windowSize: { width: string; height: string };

  constructor() {
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
