import { Component } from '@angular/core';
import { AppService } from '../../services/app.service';
import { ApiService } from '../../services/api.service';
import User from '../../models/user.model';
import Role from '../../models/role.model';
import { FormsModule } from '@angular/forms';
import searchOnArray from '../../shared/helpers/arraySearch';
import { ModalComponent } from '../modal/modal.component';
import Modal from '../../models/modal.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FormsModule, ModalComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  Users: User[] = [];
  Roles: Role[] = [];
  searchInput: string = '';
  SearchedUsers: User[] = [];
  modalForm?: 'newUser' | 'updateUser' | 'updatePassword' | 'updateEmail';
  modal: Modal = {
    title: '',
    visibility: false,
  };
  User: User = {
    id: null,
    role_id: null,
    first_name: null,
    last_name: null,
    email: null,
    password: null,
    api_secret: null,
    created_at: null,
    updated_at: null,
  };

  constructor(private appService: AppService, private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadUserList();
  }

  /**
   * Loads the list of users and updates the component's state with the retrieved data.
   *
   * This asynchronous method performs the following steps:
   * 1. Sets the loading indicator to visible by calling `setloadingVisibility(true)`.
   * 2. Sends an HTTP GET request to fetch the list of users from the 'users' endpoint.
   * 3. Calls `loadRoleList()` to load the roles, which is awaited to ensure roles are loaded before proceeding.
   * 4. If the response is successful:
   *    - Updates `Users` and `SearchedUsers` with the retrieved user data.
   * 5. If the response is not successful:
   *    - Displays an alert indicating the failure to fetch data.
   * 6. Hides the loading indicator by calling `setloadingVisibility(false)`.
   * 7. Catches and logs any errors that occur during the process, and displays an alert indicating an error in loading data.
   *
   * @memberof YourComponentName
   * @function
   * @returns {Promise<void>} - This method does not return a value; it updates the component's state and handles errors.
   *
   * @throws {Error} - Throws an error if the API request fails or if there are issues in the `loadRoleList` method.
   *
   * @example
   * // Assuming this component has access to appService and apiService.
   * await this.loadUserList(); // Fetches user data and updates the component's state.
   */
  async loadUserList() {
    try {
      this.appService.setloadingVisibility(true);
      const response = await this.apiService.sendRequest('users', 'get', true);
      await this.loadRoleList();

      // success
      if (response.success) {
        this.Users = response.data;
        this.SearchedUsers = response.data;
      }

      // failed
      if (!response.success) {
        this.appService.alert('Fetch Data Failed!', 'danger');
      }

      this.appService.setloadingVisibility(false);
    } catch (error) {
      console.log(error);
      this.appService.alert('Error in load data!', 'danger');
    }
  }

  /**
   * Loads the list of roles and updates the component's state with the retrieved data.
   *
   * This asynchronous method performs the following steps:
   * 1. Sets the loading indicator to visible by calling `setloadingVisibility(true)`.
   * 2. Sends an HTTP GET request to fetch the list of roles from the 'role' endpoint.
   * 3. If the response is successful:
   *    - Updates `Roles` with the retrieved role data.
   * 4. If the response is not successful:
   *    - Displays an alert indicating the failure to fetch data.
   * 5. Hides the loading indicator by calling `setloadingVisibility(false)`.
   * 6. Catches and logs any errors that occur during the process, and displays an alert indicating an error in loading data.
   *
   * @memberof YourComponentName
   * @function
   * @returns {Promise<void>} - This method does not return a value; it updates the component's state and handles errors.
   *
   * @throws {Error} - Throws an error if the API request fails.
   *
   * @example
   * // Assuming this component has access to appService and apiService.
   * await this.loadRoleList(); // Fetches role data and updates the component's state.
   */
  async loadRoleList() {
    try {
      this.appService.setloadingVisibility(true);
      const response = await this.apiService.sendRequest('role', 'get', true);

      // success
      if (response.success) {
        this.Roles = response.data;
      }

      // failed
      if (!response.success) {
        this.appService.alert('Fetch Data Failed!', 'danger');
      }
      this.appService.setloadingVisibility(false);
    } catch (error) {
      console.log(error);
      this.appService.alert('Error in load data!', 'danger');
    }
  }

  /**
   * Retrieves the name of a role based on the provided role ID.
   *
   * This method checks if the provided `roleId` is `null`. If it is, the method immediately
   * returns 'Developer' as the default role name. If the `roleId` is not `null`, it iterates
   * through the list of roles (`this.Roles`) to find a role with a matching ID. If a match is found,
   * the corresponding role name is returned. If no match is found, it returns 'Undefined'.
   *
   * @param {number | null} roleId - The ID of the role to look up. If `null`, the method returns 'Developer'.
   * @returns {string} The name of the role if found, otherwise 'Undefined'. If `roleId` is `null`,
   *                   it returns 'Developer'.
   *
   * @example
   * const roleName = this.getRoleNameById(1);
   * console.log(roleName); // Outputs the name of the role with ID 1, or 'Undefined' if not found.
   *
   * @throws {Error} This function does not throw errors explicitly but handles null checks and iteration internally.
   */
  getRoleNameById(roleId: number | null): string {
    if (roleId == null) return 'Developer';
    let roleName = null;
    this.Roles.forEach((role) => {
      if (role.id == roleId) {
        roleName = role.name;
      }
    });
    return roleName ?? 'Undefined';
  }

  /**
   * Searches for users based on the current search input and updates the list of searched users.
   *
   * This method performs the following actions:
   * 1. Checks if the `searchInput` is empty or consists only of whitespace. If so, it sets the
   *    `SearchedUsers` to the original `Users` array and exits the function.
   * 2. If `searchInput` is not empty, it calls the `searchOnArray` function to perform the search
   *    in the `Users` array based on the `searchInput`.
   * 3. Updates the `SearchedUsers` array with the result of the search. If `searchOnArray` returns
   *    null (indicating no matches found), it sets `SearchedUsers` to an empty array.
   *
   * @memberof YourComponentName
   * @function
   * @returns {void} - This method does not return a value; it updates the `SearchedUsers` property.
   *
   * @example
   * // Assuming this.searchInput is "Alice" and this.Users contains user data.
   * this.search(); // Updates this.SearchedUsers with users whose data includes "Alice".
   */
  search() {
    // Check input
    if (this.searchInput.trim() == '') {
      this.SearchedUsers = this.Users;
      return;
    }

    // Search User
    const searchResult = searchOnArray(this.Users, this.searchInput);
    this.SearchedUsers = searchResult !== null ? searchResult : [];
  }

  /**
   * Resets the `newUser` object to its default state.
   *
   * This method initializes the `newUser` object with default values. It sets all properties
   * to their initial values, which includes:
   * - `id` as `null`, indicating no specific user ID.
   * - `role_id` as `0`, representing a default or unassigned role.
   * - `first_name` and `last_name` as empty strings, clearing any previously entered names.
   * - `email` as an empty string, clearing any previously entered email address.
   * - `password` as an empty string, ensuring no password is set.
   * - `api_secret` as `null`, indicating no API secret is assigned.
   * - `created_at` and `updated_at` as `null`, implying no date information is available or relevant.
   *
   * This method is typically used to clear or initialize the form for adding a new user,
   * ensuring that all fields are reset to their default values before the user starts
   * entering new data.
   *
   * @memberof YourComponentName
   * @function
   * @returns {void} - This method does not return a value; it directly modifies the `newUser` property.
   *
   * @example
   * // Assuming this component has a newUser property that is used to store user data.
   * this.resetNewUser(); // Resets the newUser object to its default state.
   */
  resetNewUser() {
    this.User = {
      id: null,
      role_id: null,
      first_name: null,
      last_name: null,
      email: null,
      password: null,
      api_secret: null,
      created_at: null,
      updated_at: null,
    };
  }

  /**
   * Creates a new user by sending a POST request to the API.
   * Handles both success and error scenarios, and updates the UI accordingly.
   */
  async createNewUser() {
    try {
      this.appService.setloadingVisibility(true);

      const response = await this.apiService.sendRequest(
        'users',
        'post',
        true,
        this.User
      );

      // success
      if (response.success) {
        this.appService.alert('Create User Successfully!', 'success');
        this.appService.setloadingVisibility(true);
        this.modal.visibility = false;
        this.resetNewUser();
      }

      // error
      if (!response.success) {
        this.modal.visibility = false;
        this.appService.setloadingVisibility(true);
        this.appService.alert(response.message, 'danger');
      }

      this.loadUserList();
    } catch (error) {
      this.appService.alert('Failed to create user!', 'danger');
    }
  }

  async updateUser() {
    try {
      this.appService.setloadingVisibility(true);

      // check data
      if (this.User.first_name?.trim() == '') {
        this.User.first_name = null;
      }
      if (this.User.last_name?.trim() == '') {
        this.User.last_name = null;
      }

      const response = await this.apiService.sendRequest(
        `users/${this.User.id}`,
        'put',
        true,
        this.User
      );

      this.appService.setloadingVisibility(false);

      // success
      if (response.success) {
        this.modal.visibility = false;
        await this.updateRole();
        this.appService.alert('Update User Successfully!', 'success');
        this.loadUserList();
        this.resetNewUser();
      }

      // error
      if (!response.success) {
        this.modal.visibility = false;
        this.appService.alert(response.message, 'danger');
      }

      this.loadUserList();
    } catch (error) {
      this.appService.alert('Failed to update user!', 'danger');
    }
  }

  async updateRole() {
    try {
      if (typeof this.User.role_id == 'string') {
        this.User.role_id = null;
      }

      const response = await this.apiService.sendRequest(
        `users/${this.User.id}/role`,
        'put',
        true,
        this.User
      );

      // error
      if (!response.success) {
        this.appService.alert(response.message, 'danger');
      }

      this.loadUserList();
    } catch (error) {
      this.appService.alert('Failed to update role!', 'danger');
    }
  }

  async updateEmail() {
    try {
      const response = await this.apiService.sendRequest(
        `users/${this.User.id}/email`,
        'put',
        true,
        this.User
      );

      // success
      if (response.success) {
        this.appService.alert('User Email Updated Successfully!', 'success');
        this.loadUserList();
        this.modal.visibility = false;
      }

      // error
      if (!response.success) {
        if (response.status_code == 409) {
          this.appService.alert('Email exist! please try again...', 'danger');
          return;
        }
        this.appService.alert(response.message, 'danger');
      }

      this.loadUserList();
    } catch (error) {
      this.appService.alert('Failed to update email!', 'danger');
    }
  }

  async updatePassword() {
    try {
      const response = await this.apiService.sendRequest(
        `users/${this.User.id}/password`,
        'put',
        true,
        this.User
      );

      // success
      if (response.success) {
        this.appService.alert('User Password Updated Successfully!', 'success');
        this.loadUserList();
        this.modal.visibility = false;
      }

      // error
      if (!response.success) {
        this.appService.alert(response.message, 'danger');
      }

      this.loadUserList();
    } catch (error) {
      this.appService.alert('Failed to update password!', 'danger');
    }
  }

  async deleteUser(userId: number) {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }
    try {
      const response = await this.apiService.sendRequest(
        `users/${userId}`,
        'delete',
        true
      );

      // success
      if (response.success) {
        this.appService.alert('User Deleted!', 'success');
        this.loadUserList();
        this.modal.visibility = false;
      }

      // error
      if (!response.success) {
        this.appService.alert(response.message, 'danger');
      }

      this.loadUserList();
    } catch (error) {
      this.appService.alert('Failed to delete user!', 'danger');
    }
  }

  showUpdateUserModal(userId: number) {
    this.showModal('updateUser');

    this.Users.forEach((user) => {
      if (user.id == userId) {
        this.User = user;
        return;
      }
    });
  }

  showUpdateUserEmailModal(userId: number) {
    this.showModal('updateEmail');

    this.Users.forEach((user) => {
      if (user.id == userId) {
        this.User = user;
        return;
      }
    });
  }

  showUpdateUserPasswordModal(userId: number) {
    this.showModal('updatePassword');

    this.Users.forEach((user) => {
      if (user.id == userId) {
        this.User = user;
        return;
      }
    });
  }

  showModal(
    modalForm: 'newUser' | 'updateUser' | 'updatePassword' | 'updateEmail'
  ) {
    // new user form
    if (modalForm == 'newUser') {
      this.resetNewUser();
      this.modalForm = 'newUser';
      this.modal.title = 'Create New User';
      this.modal.visibility = true;
      return;
    }

    // update user form
    if (modalForm == 'updateUser') {
      this.resetNewUser();
      this.modalForm = 'updateUser';
      this.modal.title = 'Update User';
      this.modal.visibility = true;
      return;
    }

    // update email form
    if (modalForm == 'updateEmail') {
      this.resetNewUser();
      this.modalForm = 'updateEmail';
      this.modal.title = 'Update User Email';
      this.modal.visibility = true;
      return;
    }

    // update password form
    if (modalForm == 'updatePassword') {
      this.resetNewUser();
      this.modalForm = 'updatePassword';
      this.modal.title = 'Update User Password';
      this.modal.visibility = true;
      return;
    }
  }
}
