import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsecaseDetailsComponent } from './usecase-details.component';

describe('UsecaseDetailsComponent', () => {
  let component: UsecaseDetailsComponent;
  let fixture: ComponentFixture<UsecaseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsecaseDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsecaseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
