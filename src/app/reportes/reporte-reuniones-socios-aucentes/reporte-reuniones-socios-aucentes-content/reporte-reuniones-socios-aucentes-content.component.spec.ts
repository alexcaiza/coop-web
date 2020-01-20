import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteReunionesSociosAucentesContentComponent } from './reporte-reuniones-socios-aucentes-content.component';

describe('ReporteReunionesSociosAucentesContentComponent', () => {
  let component: ReporteReunionesSociosAucentesContentComponent;
  let fixture: ComponentFixture<ReporteReunionesSociosAucentesContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteReunionesSociosAucentesContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteReunionesSociosAucentesContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
