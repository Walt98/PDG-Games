import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HListaGiochiComponent } from './h-lista-giochi.component';

describe('HListaGiochiComponent', () => {
  let component: HListaGiochiComponent;
  let fixture: ComponentFixture<HListaGiochiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HListaGiochiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HListaGiochiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
