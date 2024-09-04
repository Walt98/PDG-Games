import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReazioneACatenaComponent } from './reazione-a-catena.component';

describe('ReazioneACatenaComponent', () => {
  let component: ReazioneACatenaComponent;
  let fixture: ComponentFixture<ReazioneACatenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReazioneACatenaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReazioneACatenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
