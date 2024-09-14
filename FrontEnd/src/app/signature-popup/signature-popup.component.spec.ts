import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignaturePopupComponent } from './signature-popup.component';

describe('SignaturePopupComponent', () => {
  let component: SignaturePopupComponent;
  let fixture: ComponentFixture<SignaturePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignaturePopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignaturePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
