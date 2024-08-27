import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AppService } from '../../services/app.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, ModalComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isPasswordHidden: boolean = true;
  errors: { email: string | false; password: string | false } = {
    email: false,
    password: false,
  };
  termsModal: any = {
    visibility: false,
    title: 'DataKeeperX Terms and Conditions',
  };

  constructor(private appService: AppService, private apiService: ApiService) {}

  async login() {
    let response = await this.apiService.sendRequest('login', 'post', false, {
      email: this.email,
      password: this.password,
    });

    // success
    if (response.success) {
      this.appService.alert('Login Success!', 'success', 'light');
    }

    // error
    if (!response.success) {
      // message
      if (response.message !== null) {
        this.appService.alert(response.message, 'danger');
      }

      // fields
      this.errors = response.errors;
    }
  }
}
