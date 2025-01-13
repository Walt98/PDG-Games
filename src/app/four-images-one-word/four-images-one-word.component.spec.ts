import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourImagesOneWordComponent } from './four-images-one-word.component';

describe('FourImagesOneWordComponent', () => {
  let component: FourImagesOneWordComponent;
  let fixture: ComponentFixture<FourImagesOneWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FourImagesOneWordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourImagesOneWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
