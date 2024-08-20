import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private sideMenuVisibility = new BehaviorSubject<boolean>(true);
  private appListMenuVisibility = new BehaviorSubject<boolean>(true);
  private loadingVisibility = new BehaviorSubject<boolean>(false);

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

  // loading visibility
  setLoadingVisibility(status: boolean) {
    this.loadingVisibility.next(status);
  }

  getloadingVisibility() {
    return this.loadingVisibility.asObservable();
  }
}
