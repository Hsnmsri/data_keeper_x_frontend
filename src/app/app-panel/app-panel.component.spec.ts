import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPanelComponent } from './app-panel.component';

describe('AppPanelComponent', () => {
  let component: AppPanelComponent;
  let fixture: ComponentFixture<AppPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
