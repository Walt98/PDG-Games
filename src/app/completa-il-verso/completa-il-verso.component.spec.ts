import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletaIlVersoComponent } from './completa-il-verso.component';

describe('CompletaIlVersoComponent', () => {
  let component: CompletaIlVersoComponent;
  let fixture: ComponentFixture<CompletaIlVersoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletaIlVersoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletaIlVersoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
