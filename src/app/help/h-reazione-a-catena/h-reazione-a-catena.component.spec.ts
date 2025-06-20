import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HReazioneACatenaComponent } from './h-reazione-a-catena.component';

describe('HReazioneACatenaComponent', () => {
  let component: HReazioneACatenaComponent;
  let fixture: ComponentFixture<HReazioneACatenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HReazioneACatenaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HReazioneACatenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
