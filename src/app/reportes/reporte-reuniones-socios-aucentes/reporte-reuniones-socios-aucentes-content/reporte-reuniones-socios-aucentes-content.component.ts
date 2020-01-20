import { SiblingService } from './../../../modules/services-sibling/sibling.service';
import { Asistencia } from 'src/app/models/Asistencia';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject, merge } from 'rxjs';

@Component({
  selector: 'app-reporte-reuniones-socios-aucentes-content',
  templateUrl: './reporte-reuniones-socios-aucentes-content.component.html',
  styleUrls: ['./reporte-reuniones-socios-aucentes-content.component.css']
})
export class ReporteReunionesSociosAucentesContentComponent implements OnInit {

  public siblingReporteReunionesSociosAucentes$: Observable<any>;

  public asistencias: Asistencia[];

  public totalizado: boolean = false;

  constructor(
    private siblingService: SiblingService
  ) {
    this.siblingReporteReunionesSociosAucentes$ = siblingService.siblingReporteReunionesSociosAucentes$;
   }

  ngOnInit() {
    
    console.log('METODO: ngOnInit()');

    this.siblingReporteReunionesSociosAucentes$.subscribe(data => {
      if (data) {
        if (data && data.asistencias){
          this.asistencias = data.asistencias;
        }
        if (data && data.totalizado != undefined){
          this.totalizado = data.totalizado;
        }
      }
      console.log(this.asistencias);
      console.log(this.totalizado);
    });
  }
}
