import { MessagesAppService } from './../../../services/messages-app/messages-app.service';
import { SiblingService } from './../../services-sibling/sibling.service';
import { CuotasService } from './../../../servicios/cuotas/cuotas.service';
import { Lote } from './../../../models/Lote';
import { PagosModalComponent } from './../pagos-modal/pagos-modal.component';
import { Persona } from './../../../models/Persona';
import { Cuota } from './../../../models/Cuota';
import { Component, OnInit, ViewChild } from '@angular/core';


import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError, map, filter } from 'rxjs/operators';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Pago } from 'src/app/models/Pago';


@Component({
  selector: 'app-pagos-list-search',
  templateUrl: './pagos-list-search.component.html',
  styleUrls: ['./pagos-list-search.component.css']
})
export class PagosListSearchComponent implements OnInit {

  public formBusqueda: FormGroup;

  public pagos: Pago[];

  public cuota: Cuota = new Cuota();
  public persona: Persona = new Persona();

  public modelCuota: any;
  public modelPersona: any;
  public modelLote: any;

  public codigocuota: Number;
  public codigopersona: Number;
  public codigolote: Number;

  @ViewChild('instanceCuota', { static: true })
  public instanceCuota: NgbTypeahead;

  @ViewChild('instancePersona', { static: true })
  public instancePersona: NgbTypeahead;

  @ViewChild('instanceLote', { static: true })
  public instanceLote: NgbTypeahead;

  public focusCuota$ = new Subject<Cuota>();
  public clickCuota$ = new Subject<Cuota>();

  public focusPersona$ = new Subject<Persona>();
  public clickPersona$ = new Subject<Persona>();

  public focusLote$ = new Subject<Lote>();
  public clickLote$ = new Subject<Lote>();

  constructor(
    private formBuilder: FormBuilder,
    private cuotasService: CuotasService,
    private siblingService: SiblingService,
    private messagesService: MessagesAppService,
  ) { }

  ngOnInit() {
    console.log('METODO: ngOnInit()');

    this.createFormBusqueda();
  }

  createFormBusqueda() {

    this.modelCuota = null;
    this.modelLote = null;
    this.modelPersona = null;

    this.codigocuota = null;
    this.codigolote = null;
    this.codigopersona = null;

    this.formBusqueda = this.formBuilder.group({
      cuota: ['', Validators.required],
      persona: ['', Validators.required],
      apellidosocio: ['', Validators.required],
      nombresocio: ['', Validators.required],
      lote: ['', Validators.required],
    });

  }

  selectedCuota(item) {
    //console.log(item.item);
    console.log(this.cuota);
    this.codigocuota = item.item.codigocuota;
    console.log(this.codigocuota);
    this.modelCuota = item.item;

    this.pagos = [];
  }

  buscarCuotasLotesFilters() {
    console.log('METODO: buscarCuotasLotesFilters()');

    console.log(this.formBusqueda.value);

    let params: any = {};

    const persona = this.formBusqueda.get("persona").value;
    console.log('persona: ' + persona);

    if (persona == null || persona === '') {
      this.codigopersona = null;
    }

    const cuota = this.formBusqueda.get("cuota").value;
    console.log('cuota: ' + cuota);

    if (cuota == null || cuota === '') {
      this.codigocuota = null;
    }

    const lote = this.formBusqueda.get("lote").value;
    console.log('cuota: ' + cuota);

    if (lote == null || lote === '') {
      this.codigolote = null;
    }

    params.codigopersona = this.codigopersona;
    params.codigolote = this.codigolote;
    params.codigocuota = this.codigocuota;

    params.tiposcuota = 'CUO';

    if (this.formBusqueda.get("apellidosocio").value != null && this.formBusqueda.get("apellidosocio").value !== '') {
      params.apellidosocio = this.formBusqueda.get("apellidosocio").value;
    }
    if (this.formBusqueda.get("nombresocio").value != null && this.formBusqueda.get("nombresocio").value !== '') {
      params.nombresocio = this.formBusqueda.get("nombresocio").value;
    }

    this.cuotasService.consultarCuotasLotes2(params).subscribe((response: any) => {

      console.log(response);

      this.pagos = [];

      if (response && response.data) {
        this.pagos = response.data;
        console.log(this.pagos);
        this.siblingService.setPagos(this.pagos);

        if (this.pagos.length > 0) {
          this.messagesService.success('La busqueda se realizo correctamente.');
        } else {
          this.messagesService.warning('No se encontraron registros con los datos de busqueda.');
        }
      }
    });

  }

  cancelCuotasLotesFilters() {
    console.log('METODO: cancelCuotasLotesFilters()');
    this.siblingService.setPagos(null);
    this.createFormBusqueda();
  }

  searchCuota = (text$: Observable<Cuota>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.clickCuota$.pipe(filter(() => !this.instanceCuota.isPopupOpen()));
    const inputFocus$ = this.focusCuota$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      switchMap((searchText) =>
        //this.albumService.artistLookup(searchText)
        this.cuotasService.readCuotas(searchText)
      )
    );
  }

  resultFormatCuotaListValue(value: any) {
    return value.descripcioncuota;
  }

  inputFormatCuotaListValue(value: any) {
    if (value.descripcioncuota)
      return value.descripcioncuota
    return value;
  }

  searchPersona = (text$: Observable<string>) => {
    console.log('text$:' + text$);

    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.clickPersona$.pipe(filter(() => !this.instancePersona.isPopupOpen()));
    const inputFocus$ = this.focusPersona$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      switchMap((searchText) =>
        //this.albumService.artistLookup(searchText)
        this.cuotasService.readPersonas(searchText)
      )
    );

  }

  selectedPersona(item) {
    this.codigopersona = item.item.codigopersona;
    console.log(this.codigopersona);
    this.modelPersona = item.item;
    /*
    this.formBusqueda.setValue(
      {
        lote: null,
        nombresocio: null,
        apellidosocio: null
      }
    );
    */

    this.formBusqueda.patchValue({
      lote: null,
      nombresocio: item.item.primernombre,
      apellidosocio: item.item.primerapellido
    });
  }

  resultFormatPersonaListValue(value: any) {
    return value.cedula;
  }

  inputFormatPersonaListValue(value: any) {
    if (value.cedula)
      return value.cedula
    return value;
  }

  searchLote = (text$: Observable<Lote>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.clickLote$.pipe(filter(() => {
      if (this.instanceLote) {
        return !this.instanceLote.isPopupOpen();
      }
      return false;
    }));
    const inputFocus$ = this.focusLote$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      switchMap((searchText) =>
        //this.albumService.artistLookup(searchText)
        this.cuotasService.readLote(this.codigopersona)
      )
    );
  }

  selectedLote(item) {
    //console.log(item.item);
    this.codigolote = item.item.codigolote;
    console.log(this.codigolote);
    this.modelLote = item.item;
  }

  resultFormatLoteListValue(value: any) {
    return value.codigoreferencia;
  }

  inputFormatLoteListValue(value: any) {
    if (value.codigoreferencia)
      return value.codigoreferencia
    return value;
  }

}
