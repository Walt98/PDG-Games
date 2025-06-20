import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HFourImagesOneWordComponent } from './h-four-images-one-word.component';

describe('HFourImagesOneWordComponent', () => {
  let component: HFourImagesOneWordComponent;
  let fixture: ComponentFixture<HFourImagesOneWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HFourImagesOneWordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HFourImagesOneWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
