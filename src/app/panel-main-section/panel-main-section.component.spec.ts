import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelMainSectionComponent } from './panel-main-section.component';

describe('PanelMainSectionComponent', () => {
  let component: PanelMainSectionComponent;
  let fixture: ComponentFixture<PanelMainSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelMainSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelMainSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
