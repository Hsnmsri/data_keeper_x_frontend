import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelHeaderMenuComponent } from './panel-header-menu.component';

describe('PanelHeaderMenuComponent', () => {
  let component: PanelHeaderMenuComponent;
  let fixture: ComponentFixture<PanelHeaderMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelHeaderMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelHeaderMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
