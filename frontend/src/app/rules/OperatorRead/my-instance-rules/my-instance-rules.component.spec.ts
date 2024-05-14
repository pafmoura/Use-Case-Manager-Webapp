import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyInstanceRulesComponent } from './my-instance-rules.component';

describe('MyInstanceRulesComponent', () => {
  let component: MyInstanceRulesComponent;
  let fixture: ComponentFixture<MyInstanceRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyInstanceRulesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyInstanceRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
