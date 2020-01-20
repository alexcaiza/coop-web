import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenciaMainComponent } from './asistencia-main.component';

describe('AsistenciaMainComponent', () => {
  let component: AsistenciaMainComponent;
  let fixture: ComponentFixture<AsistenciaMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsistenciaMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsistenciaMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
