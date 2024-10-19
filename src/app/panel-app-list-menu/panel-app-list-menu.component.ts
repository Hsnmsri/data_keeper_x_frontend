import { Component } from '@angular/core';
import { AppService } from '../../services/app.service';
import { UserService } from '../../services/user.service';
import App from '../../models/app.model';
import { RouterLink } from '@angular/router';
import Modal from '../../models/modal.model';
import { FormControl, FormsModule } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';
import { ApiService } from '../../services/api.service';
import isEmpty from '../../shared/helpers/isEmpty';

@Component({
  selector: 'app-panel-app-list-menu',
  standalone: true,
  imports: [RouterLink, ModalComponent, FormsModule],
  templateUrl: './panel-app-list-menu.component.html',
  styleUrl: './panel-app-list-menu.component.scss',
})
export class PanelAppListMenuComponent {
  isLoading: boolean = false;
  apps: App[] = [];
  modal: Modal = { title: 'Create New Application', visibility: false };
  app: App = {
    id: undefined,
    name: '',
    user_id: undefined,
    description: '',
    created_at: undefined,
    updated_at: undefined,
  };

  constructor(
    private appService: AppService,
    private userService: UserService,
    private apiService: ApiService
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

  async createApp() {
    if (isEmpty(this.app.name) || isEmpty(this.app.description)) {
      this.appService.alert('Please fill the app name field', 'danger', 'dark');
      return;
    }

    this.userService.getUserData().subscribe((user) => {
      this.app.user_id = user.id ?? undefined;
    });

    const response = await this.apiService.sendRequest(
      'category',
      'post',
      true,
      this.app
    );

    if (response.success) {
      this.appService.alert('App Created!', 'success');
      this.closeModal();
      this.userService.updateAppList();
    }

    if (!response.success) {
      this.appService.alert('Server Error!', 'danger', 'dark');
      this.appService.alert(response.message, 'danger', 'dark');
    }
  }

  closeModal() {
    this.modal.visibility = false;
    this.resetNewAppFields();
  }

  resetNewAppFields() {
    this.app = {
      id: undefined,
      name: '',
      user_id: undefined,
      description: '',
      created_at: undefined,
      updated_at: undefined,
    };
  }
}
