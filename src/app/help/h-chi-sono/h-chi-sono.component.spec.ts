import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HChiSonoComponent } from './h-chi-sono.component';

describe('HChiSonoComponent', () => {
  let component: HChiSonoComponent;
  let fixture: ComponentFixture<HChiSonoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HChiSonoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HChiSonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
