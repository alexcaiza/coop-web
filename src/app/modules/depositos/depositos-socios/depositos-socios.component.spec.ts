import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositosSociosComponent } from './depositos-socios.component';

describe('DepositosSociosComponent', () => {
  let component: DepositosSociosComponent;
  let fixture: ComponentFixture<DepositosSociosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositosSociosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositosSociosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
