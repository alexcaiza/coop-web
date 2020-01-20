import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenciaListComponent } from './asistencia-list.component';

describe('AsistenciaListComponent', () => {
  let component: AsistenciaListComponent;
  let fixture: ComponentFixture<AsistenciaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsistenciaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsistenciaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
