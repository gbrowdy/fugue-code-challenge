import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DifferenceCardComponent } from './difference-card.component';

describe('DifferenceCardComponent', () => {
  let component: DifferenceCardComponent;
  let fixture: ComponentFixture<DifferenceCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DifferenceCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DifferenceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
