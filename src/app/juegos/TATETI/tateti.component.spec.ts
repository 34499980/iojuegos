import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TATETIComponent } from './tateti.component';

describe('TATETIComponent', () => {
  let component: TATETIComponent;
  let fixture: ComponentFixture<TATETIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TATETIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TATETIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
