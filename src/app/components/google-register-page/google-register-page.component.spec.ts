import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleRegisterPageComponent } from './google-register-page.component';

describe('GoogleRegisterPageComponent', () => {
  let component: GoogleRegisterPageComponent;
  let fixture: ComponentFixture<GoogleRegisterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoogleRegisterPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoogleRegisterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
