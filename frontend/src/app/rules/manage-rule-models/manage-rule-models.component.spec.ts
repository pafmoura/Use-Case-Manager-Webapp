import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRuleModelsComponent } from './manage-rule-models.component';

describe('ManageRuleModelsComponent', () => {
  let component: ManageRuleModelsComponent;
  let fixture: ComponentFixture<ManageRuleModelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageRuleModelsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageRuleModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
