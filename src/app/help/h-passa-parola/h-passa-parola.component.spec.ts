import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HPassaParolaComponent } from './h-passa-parola.component';

describe('HPassaParolaComponent', () => {
  let component: HPassaParolaComponent;
  let fixture: ComponentFixture<HPassaParolaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HPassaParolaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HPassaParolaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
