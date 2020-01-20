import { SiblingService } from './../../services-sibling/sibling.service';
import { Asistencia } from './../../../models/Asistencia';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject, merge } from 'rxjs';

@Component({
  selector: 'app-asistencia-list-content',
  templateUrl: './asistencia-list-content.component.html',
  styleUrls: ['./asistencia-list-content.component.css']
})
export class AsistenciaListContentComponent implements OnInit {

  public siblingAsistencias$: Observable<any>;

  public asistencias: Asistencia[];

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

}
