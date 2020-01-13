import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositosListComponent } from './depositos-list.component';

describe('DepositosListComponent', () => {
  let component: DepositosListComponent;
  let fixture: ComponentFixture<DepositosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositosListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
