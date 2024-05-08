import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleModelDetailsComponent } from './rule-model-details.component';

describe('RuleModelDetailsComponent', () => {
  let component: RuleModelDetailsComponent;
  let fixture: ComponentFixture<RuleModelDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RuleModelDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RuleModelDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
