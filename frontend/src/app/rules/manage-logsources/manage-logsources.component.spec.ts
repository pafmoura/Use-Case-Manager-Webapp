import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLogsourcesComponent } from './manage-logsources.component';

describe('ManageLogsourcesComponent', () => {
  let component: ManageLogsourcesComponent;
  let fixture: ComponentFixture<ManageLogsourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageLogsourcesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageLogsourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
