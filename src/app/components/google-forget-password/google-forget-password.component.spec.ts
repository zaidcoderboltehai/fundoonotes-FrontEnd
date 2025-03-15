import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleForgetPasswordComponent } from './google-forget-password.component';

describe('GoogleForgetPasswordComponent', () => {
  let component: GoogleForgetPasswordComponent;
  let fixture: ComponentFixture<GoogleForgetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoogleForgetPasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoogleForgetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
