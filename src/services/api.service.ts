import { Injectable, resolveForwardRef } from '@angular/core';
import axios, { Axios } from 'axios';
import env from '../env';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiBaseUrl: string = env.API_BASE_URL;
  private authToken: string | null = window.localStorage.getItem('token');

  /**
   * Sends an HTTP request to a specified route with customizable method, authorization, and data.
   *
   * This function is a utility for making HTTP requests using Axios. It supports GET, POST, PUT, and DELETE methods.
   * Depending on the method specified, it either appends data to the URL (for GET requests) or includes it in the
   * request body (for POST, PUT, DELETE). The function also supports optional authorization headers.
   *
   * @param route - The API route to which the request will be sent. This should be a relative path, which will be appended to the base URL.
   * @param method - The HTTP method to use for the request. Supported methods are 'get', 'post', 'put', and 'delete'.
   * @param hasAuthorization - A boolean flag indicating whether the request should include an Authorization header with a Bearer token. Default is false.
   * @param data - Optional data to be sent with the request. For GET requests, this data is converted to query parameters. For other methods, it is sent in the request body. Default is null.
   * @param headers - An optional object containing additional headers to include in the request. Default is an empty object.
   * @returns A promise that resolves to the response data from the server.
   *
   * @example
   * // Send a GET request with authorization
   * const data = await sendRequest('/user/profile', 'get', true);
   *
   * @example
   * // Send a POST request with data and custom headers
   * const data = await sendRequest('/user/create', 'post', false, { name: 'John' }, { 'Custom-Header': 'value' });
   */
  async sendRequest(
    route: string,
    method: 'get' | 'post' | 'put' | 'delete',
    hasAuthorization: boolean = false,
    data: any = null,
    headers: any = {}
  ) {
    let response: any;

    // generate headers
    let requestHeader = headers;
    if (hasAuthorization) {
      requestHeader['Authorization'] = `Bearer ${this.authToken}`;
    }

    // get request
    if (method == 'get') {
      response = await axios.get(this.generateRoute(route, data), {
        headers: requestHeader,
      });
      return response.data;
    }

    // post put delete request
    response = await axios({
      url: this.generateRoute(route),
      method: method,
      headers: requestHeader,
      data: data,
    });
    console.log(response.data);
    return response.data;
  }

  /**
   * Generates a complete API route URL by combining the base URL, API route, and optional query parameters.
   *
   * This method constructs a full URL by appending the provided API route to the base URL. It also removes
   * any unnecessary slashes from the base URL and API route to ensure a valid URL format. If query parameters
   * are provided, they are converted to a query string and appended to the URL.
   *
   * @param apiRoute - The specific API route to be appended to the base URL (e.g., "user/create").
   * @param data - An optional JSON object containing query parameters to be included in the URL.
   * @returns A fully constructed URL string combining the base URL, API route, and query string if provided.
   */
  generateRoute(apiRoute: string, data: any = null) {
    // check base url
    let baseUrl: string = this.apiBaseUrl;
    let mainApiRoute: string = apiRoute;
    let apiResultRoute: string;

    // check base URL end slash (/)
    if (baseUrl.endsWith('/')) {
      baseUrl = baseUrl.slice(0, -1);
    }

    // check apiRouteURl start and end for slash (/);
    if (mainApiRoute.startsWith('/')) {
      mainApiRoute = mainApiRoute.slice(0, 1);
    }
    if (mainApiRoute.endsWith('/')) {
      mainApiRoute = mainApiRoute.slice(0, -1);
    }

    // generate data
    if (data !== null) {
      let queryString = this.jsonToQueryString(data);
      return `${baseUrl}/${mainApiRoute}?${queryString}`;
    }

    return `${baseUrl}/${mainApiRoute}`;
  }

  /**
   * Converts a JSON object into a query string.
   *
   * This method takes a JSON object where each key-value pair represents a query parameter.
   * It converts these pairs into a URL-encoded query string that can be appended to a URL.
   *
   * @param json - The JSON object containing the query parameters as key-value pairs.
   * @returns A URL-encoded query string representing the key-value pairs in the input JSON object.
   */
  private jsonToQueryString(json: Record<string, any>): string {
    const queryString = Object.keys(json)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(json[key])}`
      )
      .join('&');
    return `${queryString}`;
  }
}
