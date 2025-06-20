import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HImpiccatoComponent } from './h-impiccato.component';

describe('HImpiccatoComponent', () => {
  let component: HImpiccatoComponent;
  let fixture: ComponentFixture<HImpiccatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HImpiccatoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HImpiccatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
