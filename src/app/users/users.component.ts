import { Component } from '@angular/core';
import { AppService } from '../../services/app.service';
import { ApiService } from '../../services/api.service';
import User from '../../models/user.model';
import Role from '../../models/role.model';
import { FormsModule } from '@angular/forms';
import searchOnArray from '../../shared/helpers/arraySearch';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  Users: User[] = [];
  Roles: Role[] = [];
  searchInput: string = '';
  SearchedUsers: User[] = [];

  constructor(private appService: AppService, private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadUserList();
  }

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
}
