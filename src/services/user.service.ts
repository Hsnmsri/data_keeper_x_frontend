import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { jwtDecode } from 'jwt-decode';
import Role from '../models/role.model';
import User from '../models/user.model';
import { BehaviorSubject } from 'rxjs';
import Permission from '../models/permission.model';

interface JwtPayload {
  sub: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userData: BehaviorSubject<User> = new BehaviorSubject<User>({
    id: null,
    role_id: null,
    first_name: null,
    last_name: null,
    email: null,
    api_secret: null,
    created_at: null,
    updated_at: null,
  });
  private userRole: BehaviorSubject<Role> = new BehaviorSubject<Role>({
    id: null,
    name: null,
    created_at: null,
    updated_at: null,
    description: null,
    permissions: null,
  });

  constructor() {}

  /**
   * Checks if the user has a specific permission based on the permission name.
   *
   * This method looks through the list of permissions associated with the user's role
   * to determine if a specific permission exists. If the list of permissions is `null`,
   * the method immediately returns `false`, indicating that the permission is not present.
   * Otherwise, it iterates over the permissions to check if any of them match the provided
   * `permissionName`. If a match is found, it sets `hasPermission` to `true`.
   *
   * @param {string} permissionName - The name of the permission to check.
   * @returns {boolean} `true` if the user has the specified permission; otherwise, `false`.
   *
   * @example
   * const canEdit = this.hasPermission('edit_content');
   * if (canEdit) {
   *   console.log('User has permission to edit content.');
   * } else {
   *   console.log('User does not have permission to edit content.');
   * }
   *
   * @throws {Error} This function does not throw errors explicitly but handles null checks and iteration internally.
   */
  hasPermission(permissionName: string): boolean {
    let tempPermissionList: Permission[] | null =
      this.userRole.value.permissions;
    if (tempPermissionList == null) return false;

    // scroll on permission list
    let hasPermission: boolean = false;
    tempPermissionList.forEach((element: Permission) => {
      if (element.name == permissionName) {
        hasPermission = true;
      }
    });

    return false;
  }

  /**
   * Loads the user's role based on the user data and assigns it to the `userRole` property.
   *
   * This asynchronous method checks if the `userRole` property is already set and has a valid `id`.
   * If the `id` is null or undefined, the method exits early. Otherwise, it sends a request to fetch
   * the role information using the user ID stored in `userData`. If the request is successful, the
   * role information is stored in the `userRole` property. In case of an error during the request,
   * an error message is logged to the console.
   *
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   *
   * @example
   * async function fetchUserRole() {
   *   await this.loadUserRole();
   *   console.log(this.userRole); // Outputs the user's role information if loaded successfully.
   * }
   *
   * @throws {Error} This function does not throw errors explicitly but logs errors internally.
   */
  async loadUserRole() {
    if (this.userRole.value.id == null) return;

    try {
      const response = await new ApiService().sendRequest(
        `role/${this.userData.value.id}`,
        'get',
        true
      );

      this.userRole.next(response.data);
    } catch (error) {
      console.error('failed to load user permissions!');
    }
  }

  /**
   * Verifies the access token stored in local storage by sending a request to the token verification endpoint.
   *
   * This asynchronous method retrieves the JWT token from local storage and checks its presence. If the token
   * is not found, the method immediately returns `false`. If the token is present, it sends a `GET` request to
   * the `verify_token` endpoint to verify the token's validity. If the request is successful, it returns `true`;
   * otherwise, it returns `false` in case of an error or failed verification.
   *
   * @returns {Promise<boolean>} A promise that resolves to `true` if the token is present and verification
   *                             is successful; otherwise, resolves to `false`.
   *
   * @example
   * async function checkToken() {
   *   const isValid = await this.verifyAccessToken();
   *   if (isValid) {
   *     console.log('Token is valid.');
   *   } else {
   *     console.log('Token is invalid or not present.');
   *   }
   * }
   *
   * @throws {Error} This function does not throw errors explicitly but handles errors internally.
   */
  async verifyAccessToken(): Promise<boolean> {
    const token: string | null = localStorage.getItem('token');

    // if token not set
    if (token == null) {
      return false;
    }

    try {
      const response = await new ApiService().sendRequest(
        'verify_token',
        'get',
        true
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Retrieves the stored user data from the instance property.
   *
   * This method returns the current value of the `userData` instance property, which holds user data
   * that was previously fetched and stored. If no user data has been fetched yet, it will return
   * whatever value `userData` currently holds, which may be `undefined` or any previously stored data.
   *
   * @returns {any} The user data stored in the `userData` instance property. The type of the returned
   *                value depends on what was previously stored in `userData`.
   *
   * @example
   * const userData = this.getUserData();
   * console.log(userData); // Outputs the current user data or undefined if no data has been set
   */
  getUserData() {
    return this.userData.asObservable();
  }

  /**
   * Returns an observable of the user's role.
   *
   * This method provides access to the `userRole` as an observable, allowing other parts
   * of the application to subscribe to changes in the user's role. This is useful in
   * reactive programming contexts where you want to react to changes in the user's role
   * in real-time.
   *
   * @returns {Observable<Role>} An observable of the `userRole`, which emits the current
   *                             role of the user whenever it changes.
   *
   * @example
   * this.getUserRole().subscribe(role => {
   *   console.log('User role has changed:', role);
   * });
   *
   * @throws {Error} This function does not throw errors explicitly.
   */
  getUserRole() {
    return this.userRole.asObservable();
  }

  /**
   * Fetches user data from the API using the user ID extracted from the JWT token stored in local storage.
   *
   * This method retrieves the JWT token from local storage, extracts the user ID from the token,
   * and then sends an HTTP GET request to fetch user data from the API. If the request is successful,
   * it stores the user data in the instance property `userData` and returns `true`. If any error occurs
   * or the request is unsuccessful, it returns `false`.
   *
   * @returns {Promise<boolean>} A promise that resolves to `true` if the user data is successfully
   *                             fetched and stored; otherwise, resolves to `false`.
   *
   * @example
   * async function fetchUserData() {
   *   const result = await this.getUserData();
   *   if (result) {
   *     console.log('User data fetched successfully.');
   *   } else {
   *     console.log('Failed to fetch user data.');
   *   }
   * }
   *
   * @throws {Error} This function does not throw errors explicitly, but logs errors internally.
   */
  async loadUserData(): Promise<boolean> {
    const apiService = new ApiService();

    const token: string | null = localStorage.getItem('token');
    let tempUserData = this.userData.value;
    tempUserData.id = Number(this.getUserIdFromToken(token));
    this.userData.next(tempUserData);

    try {
      const response = await apiService.sendRequest(
        `users/${this.userData.value.id}`,
        'get',
        true
      );

      // success
      if (response.success) {
        this.userData.next(response.data);

        // set user role
        let tempUserRole = this.userRole.value;
        tempUserRole.id = response.data.role_id;
        this.userRole.next(tempUserRole);

        if (this.userRole.value.id == null) {
          tempUserRole = this.userRole.value;
          tempUserRole.name = 'Developer';
          this.userRole.next(tempUserRole);
        }

        return true;
      }
    } catch (error) {
      return false;
    }

    return false;
  }

  /**
   * Extracts the user ID (sub) from a JWT token.
   *
   * @param {string | null} token - The JWT token from which to extract the user ID.
   *                                If the token is null, the function returns null.
   * @returns {string | null} The user ID (sub) if the token is valid and contains a sub claim;
   *                          otherwise, returns null.
   *
   * @example
   * const token = 'your-jwt-token-here';
   * const userId = getUserIdFromToken(token);
   * console.log(userId); // Outputs the user ID (sub) or null if the token is invalid
   *
   * @throws {Error} Logs an error message if decoding the token fails.
   */
  private getUserIdFromToken(token: string | null): string | null {
    try {
      if (token == null) return null;
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.sub;
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  }
}
