import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import randStr from '../shared/helpers/randStr';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private sideMenuVisibility = new BehaviorSubject<boolean>(true);
  private appListMenuVisibility = new BehaviorSubject<boolean>(true);
  private loadingVisibility = new BehaviorSubject<boolean>(false);
  private alerts = new BehaviorSubject<any>([]);

  // side menu
  toggleSideMenu() {
    this.sideMenuVisibility.next(!this.sideMenuVisibility.value);
  }

  getSideMenuVisibility() {
    return this.sideMenuVisibility.asObservable();
  }

  // app menu list
  toggleAppListMenu() {
    this.appListMenuVisibility.next(!this.appListMenuVisibility.value);
  }

  getAppListMenuVisibility() {
    return this.appListMenuVisibility.asObservable();
  }

  // loading
  setloadingVisibility(visibility: boolean) {
    this.loadingVisibility.next(visibility);
  }

  getloadingVisibility() {
    return this.loadingVisibility.asObservable();
  }

  // loading visibility
  async alert(
    text: string,
    bgStatus: string = 'primary',
    textStatus: string = 'dark',
    timeout_ms: number = 2300
  ) {
    // create alert new list
    let alertList = this.alerts.value;
    let alert_key = randStr(5);
    alertList.push({
      t_key: alert_key,
      text: text,
      bgStatus: bgStatus,
      textStatus: textStatus,
    });
    this.alerts.next(alertList);

    // delete alert
    await new Promise((resolve) => setTimeout(resolve, timeout_ms)); // Wait for 1300ms
    await this.deleteAlert(alert_key); // Await the deleteAlert function
  }

  deleteAlert(t_key: string): Promise<void> {
    return new Promise((resolve) => {
      let alertList = this.alerts.value;

      for (const arrayKey in alertList) {
        if (alertList[arrayKey]['t_key'] === t_key) {
          alertList.splice(arrayKey, 1);
          break;
        }
      }

      this.alerts.next(alertList);
      resolve(); // Resolve the promise when the deletion is done
    });
  }

  getAlerts() {
    return this.alerts.asObservable();
  }
}
