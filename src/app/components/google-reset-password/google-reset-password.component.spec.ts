import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleResetPasswordComponent } from './google-reset-password.component';

describe('GoogleResetPasswordComponent', () => {
  let component: GoogleResetPasswordComponent;
  let fixture: ComponentFixture<GoogleResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoogleResetPasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoogleResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
