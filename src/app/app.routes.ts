import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { PanelComponent } from './panel/panel.component';
import { UsersComponent } from './users/users.component';
import { AppsComponent } from './apps/apps.component';
import { AppPanelComponent } from './app-panel/app-panel.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: 'reset-password/:token',
    component: ResetPasswordComponent,
  },
  {
    path: 'panel',
    component: PanelComponent,
    children: [
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'apps',
        component: AppsComponent,
        children: [
          {
            path: ':id',
            component: AppPanelComponent,
          },
        ],
      },
    ],
  },
];
