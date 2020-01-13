import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositosCreateComponent } from './depositos-create.component';

describe('DepositosCreateComponent', () => {
  let component: DepositosCreateComponent;
  let fixture: ComponentFixture<DepositosCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositosCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositosCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
