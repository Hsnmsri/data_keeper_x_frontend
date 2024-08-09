import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelAppListMenuComponent } from './panel-app-list-menu.component';

describe('PanelAppListMenuComponent', () => {
  let component: PanelAppListMenuComponent;
  let fixture: ComponentFixture<PanelAppListMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelAppListMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelAppListMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
