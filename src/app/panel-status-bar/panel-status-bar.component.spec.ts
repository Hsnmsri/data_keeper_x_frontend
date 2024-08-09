import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelStatusBarComponent } from './panel-status-bar.component';

describe('PanelStatusBarComponent', () => {
  let component: PanelStatusBarComponent;
  let fixture: ComponentFixture<PanelStatusBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelStatusBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelStatusBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
