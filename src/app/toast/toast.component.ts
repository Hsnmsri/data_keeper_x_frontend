import { Component, OnInit } from '@angular/core';
import { ToastItemComponent } from '../toast-item/toast-item.component';
import { Subscription } from 'rxjs';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [ToastItemComponent],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent implements OnInit {
  private subscription!: Subscription;
  alerts: any;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    // Subscribe to the menu visibility observable
    this.subscription = this.appService.getAlerts().subscribe((alertList) => {
      this.alerts = alertList;
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
