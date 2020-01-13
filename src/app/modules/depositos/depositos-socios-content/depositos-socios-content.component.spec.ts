import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositosSociosContentComponent } from './depositos-socios-content.component';

describe('DepositosSociosContentComponent', () => {
  let component: DepositosSociosContentComponent;
  let fixture: ComponentFixture<DepositosSociosContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositosSociosContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositosSociosContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
