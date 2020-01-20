import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteReunionesSociosAucentesComponent } from './reporte-reuniones-socios-aucentes.component';

describe('ReporteReunionesSociosAucentesComponent', () => {
  let component: ReporteReunionesSociosAucentesComponent;
  let fixture: ComponentFixture<ReporteReunionesSociosAucentesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteReunionesSociosAucentesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteReunionesSociosAucentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
