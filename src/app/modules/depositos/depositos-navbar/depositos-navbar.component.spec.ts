import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositosNavbarComponent } from './depositos-navbar.component';

describe('DepositosNavbarComponent', () => {
  let component: DepositosNavbarComponent;
  let fixture: ComponentFixture<DepositosNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositosNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositosNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
