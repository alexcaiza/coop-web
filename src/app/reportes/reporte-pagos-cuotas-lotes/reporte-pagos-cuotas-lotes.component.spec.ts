import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportePagosCuotasLotesComponent } from './reporte-pagos-cuotas-lotes.component';

describe('ReportePagosCuotasLotesComponent', () => {
  let component: ReportePagosCuotasLotesComponent;
  let fixture: ComponentFixture<ReportePagosCuotasLotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportePagosCuotasLotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportePagosCuotasLotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
