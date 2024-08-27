import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { jwtDecode } from 'jwt-decode';
import { AppService } from './app.service';

interface JwtPayload {
  sub: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userData: any;

  constructor() {}

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
    return this.userData;
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
    const userId = this.getUserIdFromToken(token);

    try {
      const response = await apiService.sendRequest(
        `users/${userId}`,
        'get',
        true
      );

      // success
      if (response.success) {
        this.userData = response.data;
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
  private getUserIdFromToken(token: string | null) {
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
