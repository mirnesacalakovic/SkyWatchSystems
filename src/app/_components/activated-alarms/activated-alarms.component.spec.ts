import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedAlarmsComponent } from './activated-alarms.component';

describe('ActivatedAlarmsComponent', () => {
  let component: ActivatedAlarmsComponent;
  let fixture: ComponentFixture<ActivatedAlarmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivatedAlarmsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivatedAlarmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
