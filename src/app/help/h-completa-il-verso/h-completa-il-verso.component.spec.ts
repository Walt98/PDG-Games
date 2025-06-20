import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HCompletaIlVersoComponent } from './h-completa-il-verso.component';

describe('HCompletaIlVersoComponent', () => {
  let component: HCompletaIlVersoComponent;
  let fixture: ComponentFixture<HCompletaIlVersoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HCompletaIlVersoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HCompletaIlVersoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
