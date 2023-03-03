import { ComponentFixture, TestBed } from '@angular/core/testing';
import {AutoFormArrayLibComponent} from "./auto-form-array-lib.component";



describe('AutoFormLibComponent', () => {
  let component: AutoFormArrayLibComponent;
  let fixture: ComponentFixture<AutoFormArrayLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoFormArrayLibComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoFormArrayLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
