import { AppService } from './../../services/app.service';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast-item',
  standalone: true,
  imports: [],
  templateUrl: './toast-item.component.html',
  styleUrl: './toast-item.component.scss',
})
export class ToastItemComponent {
  @Input() t_key?: string;
  @Input() text?: string;
  @Input() bgStatus?: string;
  @Input() textStatus?: string;

  constructor(private appService: AppService) {}

  endToast(t_key?: string) {
    if (t_key) {
      this.appService.deleteAlert(t_key);
    }
  }
}
