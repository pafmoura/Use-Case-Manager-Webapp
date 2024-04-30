import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUseCasesComponent } from './manage-use-cases.component';

describe('ManageUseCasesComponent', () => {
  let component: ManageUseCasesComponent;
  let fixture: ComponentFixture<ManageUseCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageUseCasesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageUseCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
