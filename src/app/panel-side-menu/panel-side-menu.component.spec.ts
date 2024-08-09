import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelSideMenuComponent } from './panel-side-menu.component';

describe('PanelSideMenuComponent', () => {
  let component: PanelSideMenuComponent;
  let fixture: ComponentFixture<PanelSideMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelSideMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelSideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
