import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HClassificaComponent } from './h-classifica.component';

describe('HClassificaComponent', () => {
  let component: HClassificaComponent;
  let fixture: ComponentFixture<HClassificaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HClassificaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HClassificaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
