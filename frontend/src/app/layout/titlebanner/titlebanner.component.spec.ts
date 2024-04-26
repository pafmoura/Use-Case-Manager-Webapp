import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitlebannerComponent } from './titlebanner.component';

describe('TitlebannerComponent', () => {
  let component: TitlebannerComponent;
  let fixture: ComponentFixture<TitlebannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitlebannerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TitlebannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
