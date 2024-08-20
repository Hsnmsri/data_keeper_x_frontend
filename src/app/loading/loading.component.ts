import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
})
export class LoadingComponent implements OnInit {
  private subscription!: Subscription;
  loadingVisibility: boolean = false;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    // Subscribe to the menu visibility observable
    this.subscription = this.appService
      .getloadingVisibility()
      .subscribe((visible) => {
        this.loadingVisibility = visible;
      });
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
