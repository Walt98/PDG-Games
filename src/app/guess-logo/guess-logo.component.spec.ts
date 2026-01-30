import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessLogoComponent } from './guess-logo.component';

describe('GuessLogoComponent', () => {
  let component: GuessLogoComponent;
  let fixture: ComponentFixture<GuessLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuessLogoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuessLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
