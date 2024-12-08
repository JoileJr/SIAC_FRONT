import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryExamsComponent } from './history-exams.component';

describe('HistoryExamsComponent', () => {
  let component: HistoryExamsComponent;
  let fixture: ComponentFixture<HistoryExamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistoryExamsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoryExamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
