import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositosListContentComponent } from './depositos-list-content.component';

describe('DepositosListContentComponent', () => {
  let component: DepositosListContentComponent;
  let fixture: ComponentFixture<DepositosListContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositosListContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositosListContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
