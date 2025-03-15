import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { WhatsChatCmpComponent } from './whats-chat-cmp.component';

describe('WhatsChatCmpComponent', () => {
  let component: WhatsChatCmpComponent;
  let fixture: ComponentFixture<WhatsChatCmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatsChatCmpComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatsChatCmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
