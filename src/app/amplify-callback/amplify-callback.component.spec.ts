import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmplifyCallbackComponent } from './amplify-callback.component';

describe('AmplifyCallbackComponent', () => {
  let component: AmplifyCallbackComponent;
  let fixture: ComponentFixture<AmplifyCallbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmplifyCallbackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmplifyCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
