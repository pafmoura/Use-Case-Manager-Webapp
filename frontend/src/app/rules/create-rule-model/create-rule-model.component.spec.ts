import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRuleModelComponent } from './create-rule-model.component';

describe('CreateRuleModelComponent', () => {
  let component: CreateRuleModelComponent;
  let fixture: ComponentFixture<CreateRuleModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRuleModelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateRuleModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
