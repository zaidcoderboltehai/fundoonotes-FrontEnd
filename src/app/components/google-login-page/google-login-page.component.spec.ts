import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoogleLoginPageComponent } from './google-login-page.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('GoogleLoginPageComponent', () => {
  let component: GoogleLoginPageComponent;
  let fixture: ComponentFixture<GoogleLoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleLoginPageComponent ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoogleLoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
