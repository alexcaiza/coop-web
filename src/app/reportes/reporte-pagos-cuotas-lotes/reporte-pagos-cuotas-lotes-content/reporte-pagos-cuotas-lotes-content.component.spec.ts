import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportePagosCuotasLotesContentComponent } from './reporte-pagos-cuotas-lotes-content.component';

describe('ReportePagosCuotasLotesContentComponent', () => {
  let component: ReportePagosCuotasLotesContentComponent;
  let fixture: ComponentFixture<ReportePagosCuotasLotesContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportePagosCuotasLotesContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportePagosCuotasLotesContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
