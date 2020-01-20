import { SiblingService } from './../../../modules/services-sibling/sibling.service';
import { MessagesAppService } from './../../../services/messages-app/messages-app.service';
import { CuotasService } from './../../../servicios/cuotas/cuotas.service';
import { Persona } from './../../../models/Persona';
import { Reunion } from './../../../models/Reunion';
import { Cuota } from './../../../models/Cuota';
import { AsistenciasService } from './../../../servicios/asistencias/asistencias.service';


import { DepositosService } from './../../../servicios/depositos/depositos.service';
import { Deposito } from './../../../models/Deposito';
import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Asistencia } from 'src/app/models/Asistencia';

import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';

import { debounceTime, distinctUntilChanged, switchMap, catchError, map, filter } from 'rxjs/operators';

import { Observable, Subject, merge } from 'rxjs';

@Component({
  selector: 'app-reporte-reuniones-socios-aucentes-search',
  templateUrl: './reporte-reuniones-socios-aucentes-search.component.html',
  styleUrls: ['./reporte-reuniones-socios-aucentes-search.component.css']
})
export class ReporteReunionesSociosAucentesSearchComponent implements OnInit {

  public formBusqueda: FormGroup;

  public asistencias: Asistencia[];

  public reunion: Reunion = new  Reunion();
  public modelReunion: any;
  public codigoreunion: Number;

  public persona: Persona = new  Persona();
  public modelPersona: any;
  public codigopersona: Number;

  @ViewChild('instanceReunion', { static: true })
  public instanceReunion: NgbTypeahead;

  @ViewChild('instancePersona', { static: true })
  public instancePersona: NgbTypeahead;

  public focusReunion$ = new Subject<Reunion>();
  public clickReunion$ = new Subject<Reunion>();

  public focusPersona$ = new Subject<Reunion>();
  public clickPersona$ = new Subject<Reunion>();

  constructor(
    private formBuilder: FormBuilder,
    private messagesService: MessagesAppService,
    private asistenciasService: AsistenciasService,
    private cuotasService: CuotasService,
    private siblingService: SiblingService
  ) {
    this.createFormBusqueda();
  }

  ngOnInit() {
    console.log('METODO: ngOnInit()');
    //this.despositosSibling.currentMessage$.subscribe(depositos => this.depositos = depositos);
  }

  createFormBusqueda() {
    console.log('METODO: createFormBusqueda()');

    this.asistencias = null;

    this.formBusqueda = this.formBuilder.group({
      primernombre: [''],
      primerapellido: [''],
      numerodeposito: [''],
      reunion: ['', Validators.required],
      persona: ['', Validators.required],
      totalizado: [''],
    });
  }

  selectedReunion(item) {
    //console.log(item.item);
    console.log(this.reunion);
    this.codigoreunion = item.item.codigoreunion;
    console.log(this.codigoreunion);
    this.modelReunion = item.item;
  }

  searchPersona = (text$: Observable<string>) => {
    console.log('text$:' + text$);

    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.clickPersona$.pipe(filter(() => !this.instancePersona.isPopupOpen()));
    const inputFocus$ = this.focusPersona$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      switchMap((searchText) =>
        this.cuotasService.readPersonas(searchText)
      )
    );
  }

  selectedPersona(item) {
    this.codigopersona = item.item.codigopersona;
    console.log(this.codigopersona);
    this.modelPersona = item.item;
  }

  resultFormatPersonaListValue(value: any) {
    return value.cedula;
  }

  inputFormatPersonaListValue(value: any) {
    if (value.cedula)
      return value.cedula
    return value;
  }

  searchReunion = (text$: Observable<Reunion>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.clickReunion$.pipe(filter(() => !this.instanceReunion.isPopupOpen()));
    const inputFocus$ = this.focusReunion$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      switchMap((searchText) =>
        //this.albumService.artistLookup(searchText)
        this.asistenciasService.readReuniones(searchText)
      )
    );
  }

  resultFormatReunionListValue(value: any) {
    return value.nombrereunion;
  }

  inputFormatReunionListValue(value: any) {
    if (value.nombrereunion)
      return value.nombrereunion
    return value;
  }

  buscarAsistencias() {
    console.log('METODO: buscarAsistencias()');

    let paramsSearch = this.formBusqueda.value;

    if (paramsSearch.reunion != "" ) {
      paramsSearch.codigoreunion = this.codigoreunion;
    }
    
    if (paramsSearch.persona != "" ) {
      paramsSearch.codigopersona = this.codigopersona;
    }

    console.log("params: ");
    console.log(paramsSearch);

    console.log("persona: ");
    console.log(this.persona);
    console.log(this.formBusqueda);

    this.asistenciasService.readReporteReunionesSociosAucentes(paramsSearch).subscribe((response: any) => {
      this.asistencias = response.data;
      console.log(response);

      let data: any = {};
      data.asistencias = this.asistencias;
      data.totalizado = paramsSearch.totalizado;

      this.siblingService.setReporteReunionesSociosAucentes(data);

      if (this.asistencias.length > 0) {
        this.messagesService.info('La busqueda de asistencias se realizo correctamente.');
      } else {
        this.messagesService.warning('No se encontraron registros con los datos de busqueda.');
      }
    });
  }

  cancelAsistencias() {
    console.log('METODO: cancelAsistencias()');
    this.siblingService.setAsistencias(null);
    this.createFormBusqueda();
  }

  buscarDepositosFilters() {
    console.log('METODO: DepositoListComponent.buscarDepositosFilters()');

    console.log(this.formBusqueda.value);

    let paramsSearch = this.formBusqueda.value;

    this.asistenciasService.readAsistencias(paramsSearch).subscribe((asistencias: Asistencia[]) => {
      this.asistencias = asistencias;
      console.log(this.asistencias);
      //this.flashMessagesService.show('La busqueda de depositos se realizo correctamente.', { cssClass: 'alert-success', timeout: 4000 });
      this.siblingService.setAsistencias(this.asistencias);
    });

  }

}
