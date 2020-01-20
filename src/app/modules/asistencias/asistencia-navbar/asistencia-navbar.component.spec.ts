import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenciaNavbarComponent } from './asistencia-navbar.component';

describe('AsistenciaNavbarComponent', () => {
  let component: AsistenciaNavbarComponent;
  let fixture: ComponentFixture<AsistenciaNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsistenciaNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsistenciaNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
