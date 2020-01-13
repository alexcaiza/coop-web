import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesNavbarComponent } from './reportes-navbar.component';

describe('ReportesNavbarComponent', () => {
  let component: ReportesNavbarComponent;
  let fixture: ComponentFixture<ReportesNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportesNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
