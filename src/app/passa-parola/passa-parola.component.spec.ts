import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassaParolaComponent } from './passa-parola.component';

describe('PassaParolaComponent', () => {
  let component: PassaParolaComponent;
  let fixture: ComponentFixture<PassaParolaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassaParolaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassaParolaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
