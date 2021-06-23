import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubwindowComponent } from './subwindow.component';

describe('SubwindowComponent', () => {
  let component: SubwindowComponent;
  let fixture: ComponentFixture<SubwindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubwindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubwindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
