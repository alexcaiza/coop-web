import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteReunionesSociosAucentesSearchComponent } from './reporte-reuniones-socios-aucentes-search.component';

describe('ReporteReunionesSociosAucentesSearchComponent', () => {
  let component: ReporteReunionesSociosAucentesSearchComponent;
  let fixture: ComponentFixture<ReporteReunionesSociosAucentesSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteReunionesSociosAucentesSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteReunionesSociosAucentesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
