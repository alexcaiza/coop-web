import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositosSearchComponent } from './depositos-search.component';

describe('DepositosSearchComponent', () => {
  let component: DepositosSearchComponent;
  let fixture: ComponentFixture<DepositosSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositosSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositosSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
