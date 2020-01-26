import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportePagosCuotasLotesSearchComponent } from './reporte-pagos-cuotas-lotes-search.component';

describe('ReportePagosCuotasLotesSearchComponent', () => {
  let component: ReportePagosCuotasLotesSearchComponent;
  let fixture: ComponentFixture<ReportePagosCuotasLotesSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportePagosCuotasLotesSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportePagosCuotasLotesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
