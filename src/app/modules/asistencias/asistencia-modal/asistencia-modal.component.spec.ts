import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenciaModalComponent } from './asistencia-modal.component';

describe('AsistenciaModalComponent', () => {
  let component: AsistenciaModalComponent;
  let fixture: ComponentFixture<AsistenciaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsistenciaModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsistenciaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
