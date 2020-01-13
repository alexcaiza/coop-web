import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositosSociosSearchComponent } from './depositos-socios-search.component';

describe('DepositosSociosSearchComponent', () => {
  let component: DepositosSociosSearchComponent;
  let fixture: ComponentFixture<DepositosSociosSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositosSociosSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositosSociosSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
