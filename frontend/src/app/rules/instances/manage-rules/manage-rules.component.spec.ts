import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRulesComponent } from './manage-rules.component';

describe('ManageRulesComponent', () => {
  let component: ManageRulesComponent;
  let fixture: ComponentFixture<ManageRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageRulesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
