import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadarTacticsComponent } from './radar-tactics.component';

describe('RadarTacticsComponent', () => {
  let component: RadarTacticsComponent;
  let fixture: ComponentFixture<RadarTacticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadarTacticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RadarTacticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
