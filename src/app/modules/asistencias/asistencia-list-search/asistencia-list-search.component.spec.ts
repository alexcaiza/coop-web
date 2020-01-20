import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenciaListSearchComponent } from './asistencia-list-search.component';

describe('AsistenciaListSearchComponent', () => {
  let component: AsistenciaListSearchComponent;
  let fixture: ComponentFixture<AsistenciaListSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsistenciaListSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsistenciaListSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
