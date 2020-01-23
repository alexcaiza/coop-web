import { PagoType } from './../../../models/enum/PagoType';
import { AsistenciaModalComponent } from './../asistencia-modal/asistencia-modal.component';
import { SiblingService } from './../../services-sibling/sibling.service';
import { Asistencia } from './../../../models/Asistencia';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject, merge } from 'rxjs';

@Component({
  selector: 'app-asistencia-list-content',
  templateUrl: './asistencia-list-content.component.html',
  styleUrls: ['./asistencia-list-content.component.css']
})
export class AsistenciaListContentComponent implements OnInit {

  public siblingAsistencias$: Observable<any>;

  public asistencias: Asistencia[];

  @ViewChild(AsistenciaModalComponent, { static: false }) 
  public childModalAsistencia: AsistenciaModalComponent;

  constructor(
    private siblingService: SiblingService
  ) {
    this.siblingAsistencias$ = siblingService.siblingAsistencias$;
   }

  ngOnInit() {
    
    console.log('METODO: ngOnInit()');

    this.siblingAsistencias$.subscribe(asistencias => {
      this.asistencias = asistencias;
      console.log(this.asistencias);
    });
  }

  openModalAsistencia(pago) {
    console.log('METODO: openModalPago()');
    console.log(pago);
    console.log(this.childModalAsistencia);
    this.childModalAsistencia.openModalAsistencia(pago, "Pago de asistencias", PagoType.ASISTENCIA);
  }

}
