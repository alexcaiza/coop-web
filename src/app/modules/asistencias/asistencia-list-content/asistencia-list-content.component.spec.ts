import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenciaListContentComponent } from './asistencia-list-content.component';

describe('AsistenciaListContentComponent', () => {
  let component: AsistenciaListContentComponent;
  let fixture: ComponentFixture<AsistenciaListContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsistenciaListContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsistenciaListContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
