import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoFormLibComponent } from './auto-form-lib.component';

describe('AutoFormLibComponent', () => {
  let component: AutoFormLibComponent;
  let fixture: ComponentFixture<AutoFormLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoFormLibComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoFormLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
