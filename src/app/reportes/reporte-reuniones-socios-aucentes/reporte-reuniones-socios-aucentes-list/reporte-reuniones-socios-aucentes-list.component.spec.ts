import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteReunionesSociosAucentesListComponent } from './reporte-reuniones-socios-aucentes-list.component';

describe('ReporteReunionesSociosAucentesListComponent', () => {
  let component: ReporteReunionesSociosAucentesListComponent;
  let fixture: ComponentFixture<ReporteReunionesSociosAucentesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteReunionesSociosAucentesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteReunionesSociosAucentesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
