import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositosListSearchComponent } from './depositos-list-search.component';

describe('DepositosListSearchComponent', () => {
  let component: DepositosListSearchComponent;
  let fixture: ComponentFixture<DepositosListSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositosListSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositosListSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
