import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositosMainComponent } from './depositos-main.component';

describe('DepositosMainComponent', () => {
  let component: DepositosMainComponent;
  let fixture: ComponentFixture<DepositosMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositosMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositosMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
