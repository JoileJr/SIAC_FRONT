import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialofFormComponent } from './dialof-form.component';

describe('DialofFormComponent', () => {
  let component: DialofFormComponent;
  let fixture: ComponentFixture<DialofFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialofFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialofFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
