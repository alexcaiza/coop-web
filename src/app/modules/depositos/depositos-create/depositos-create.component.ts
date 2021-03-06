import { MessagesAppService } from './../../../services/messages-app/messages-app.service';
import { CuotasService } from './../../../servicios/cuotas/cuotas.service';
import { PersonasService } from './../../../servicios/personas/personas.service';
import { DepositosService } from './../../../servicios/depositos/depositos.service';
import { Persona } from './../../../models/Persona';

//import { FlashMessagesService } from 'angular2-flash-messages';


import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError, map, filter  } from 'rxjs/operators';

@Component({
  selector: 'app-depositos-create',
  templateUrl: './depositos-create.component.html',
  styleUrls: ['./depositos-create.component.css']
})
export class DepositosCreateComponent implements OnInit {

  public formGroup: FormGroup;

  public socios: Array<Persona> = [];
  public socio: Persona = new Persona();

  public modelSocio: any;

  public codigosocio: Number;

  public cedula: string;

  //public persona: Persona;

  public persona: Persona = new  Persona();
  public modelPersona: any;
  public codigopersona: Number;

  @ViewChild('instanceSocio', {static: true}) 
  public instanceSocio: NgbTypeahead;

  @ViewChild('instancePersona', { static: true })
  public instancePersona: NgbTypeahead;

  public focusSocio$ = new Subject<Persona>();
  public clickSocio$ = new Subject<Persona>();

  public focusPersona$ = new Subject<Persona>();
  public clickPersona$ = new Subject<Persona>();

  constructor(
    private formBuilder: FormBuilder,
    private depositosService: DepositosService,
    private personasService: PersonasService,
    private messagesService: MessagesAppService,
    private cuotasService: CuotasService
    ) { }

  ngOnInit() {
    console.log("Metodo DepositoCreateComponent.ngOnInit()");
    this.buildForm();
  }

  private buildForm() {
    console.log("Metodo DepositoCreateComponent.buildForm()");

    this.cedula = '';

    this.persona = null;
    this.socio = null;
    this.codigosocio = null;    
    this.socios = [];

    this.modelPersona = null;
    this.codigopersona = null;

    const dateLength = 10;
    const today = new Date().toISOString().substring(0, dateLength);

    this.formGroup = this.formBuilder.group({
      cedula: ['', Validators.required],
      valordeposito: ['', Validators.required],
      fechadeposito: [today, Validators.required],
      tipodeposito: ['', Validators.required],
      numerodeposito: ['', Validators.required],
      socio: ['', Validators.required],
      persona: ['', Validators.required],
    });
  }

  public readPersonaByCedula() {
    console.log("Metodo DepositoCreateComponent.buscarPersonaPorCedula()");

    this.persona = null;
    
    const cedulaForm = this.formGroup.get("cedula");

    this.cedula = cedulaForm.value;
    console.log(this.cedula);

    if (this.cedula == null || this.cedula === '') {
      this.messagesService.error('Ingrese la cedula para buscar el socio.');
      return;
    }

    this.personasService.readPersonaByCedula(this.cedula).subscribe((persona: Persona) => {
      if (persona == null) {
        this.messagesService.error('No se encontro el socio con el numero de cedula: ' + this.cedula + '.');
      return;
      }
      this.persona = persona;
      console.log(this.persona);
      this.messagesService.info('La busqueda del socio se realizo correctamente.');
    });
  }

  public saveDeposito() {
    console.log("METODO: DepositoCreateComponent.saveDeposito()");

    console.log(this.formGroup.value);

    if (this.persona == null) {
      this.messagesService.error('Ingrese la cedula para buscar el socio.');
      return;
    }

    const numerodeposito = this.formGroup.get("numerodeposito").value;
    console.log('numerodeposito: ' + numerodeposito);

    if (numerodeposito == null || numerodeposito === '') {
      this.messagesService.error('Ingrese el numero del deposito.');
      return;
    }

    const valordeposito = this.formGroup.get("valordeposito").value;
    console.log('valordeposito: ' + valordeposito);

    if (valordeposito == null || valordeposito === '') {
      this.messagesService.error('Ingrese el valor del deposito.');
      return;
    }

    // Realiza la validacion para el campo fechadeposito
    const fechadeposito = this.formGroup.get("fechadeposito").value;
    console.log('fechadeposito: ' + fechadeposito);

    if (fechadeposito == null || fechadeposito === '') {
      this.messagesService.error('Ingrese la fecha del deposito.');
      return;
    }

    // Realiza la validacion para el campo tipodeposito
    const tipodeposito = this.formGroup.get("tipodeposito").value;
    console.log('tipodeposito: ' + tipodeposito);

    if (tipodeposito == null || tipodeposito === '') {
      this.messagesService.error('Seleccione el tipo de deposito.');
      return;
    }

    const params : any = this.formGroup.value;

    if (this.persona != null) {
      params.codigopersona = this.persona.codigopersona;
    }

    // Guarda el socio principal del deposito para guardar en la tabla DepositosSocios
    let found = this.socios.find(element => element.codigopersona == this.persona.codigopersona);

    console.log("found:");
    console.log(found);

    if (found == undefined) {
      this.socios.push(this.persona);
    }

     // Guarda los socios relacionados al deposito para guardar en la tabla DepositosSocios
    params.socios = this.socios;

    // Llamada al servicio para guardar el deposito

    console.log(params);

    this.depositosService.createDeposito(params).subscribe((response: any) => {
      console.log("response:");
      console.log(response);

      if (response.deposito && response.deposito.codigodeposito !== null && response.deposito.codigodeposito > 0) {
        this.messagesService.info('El registro del deposito '+  params.numerodeposito +' del socio ' + this.persona.cedula + 'se realizo correctamente.');
        this.buildForm();
      }
      else {
        this.messagesService.error(response.mensaje);
      }

    });

  }

  public cancelDeposito() {
    console.log('METODO: DepositoCreateComponent.cancelDeposito()');
    this.buildForm();
  }

  searchSocio = (text$: Observable<string>) => {
    console.log('text$:' + text$);
    
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.clickSocio$.pipe(filter(() => !this.instanceSocio.isPopupOpen()));
    const inputFocus$ = this.focusSocio$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
        switchMap( (searchText) => {
          let params: Persona = new Persona();
          params.primerapellido = "" + searchText;
          return this.cuotasService.readPersonas2(params)
        }
      )
    );
  }

  searchPersona = (text$: Observable<string>) => {
    console.log('text$:' + text$);
    
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.clickPersona$.pipe(filter(() => !this.instancePersona.isPopupOpen()));
    const inputFocus$ = this.focusPersona$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
        switchMap( (searchText) => {
          let params: Persona = new Persona();
          params.primerapellido = "" + searchText;
          return this.cuotasService.readPersonas2(params)
        }
      )
    );
  }

  selectedSocio(item) {
    console.log('METODO: selectedSocio()');

    this.codigosocio = item.item.codigopersona;
    
    console.log(this.codigosocio);
    
    this.modelSocio = item.item;

    let found = this.socios.find(element => element.codigopersona == item.item.codigopersona);

    console.log("found:");
    console.log(found);

    if (found == undefined) {
      this.socios.push(item.item);
    }
    console.log(this.socios);

    this.formGroup.patchValue({
      socio: ""
    });
  }

  cleanPersona() {
    console.log('METODO: cleanPersona()');

    this.formGroup.patchValue({
      persona: ""
    });

    this.persona = null;

  }

  selectedPersona(item) {
    console.log('METODO: selectedPersona()');

    this.codigopersona = item.item.codigopersona;
    console.log('codigopersona: ' + this.codigopersona);
    
    this.modelPersona = item.item;
    console.log('modelPersona: ' + this.modelPersona);

    
    this.persona = this.modelPersona;
  }

  resultFormatPersonaListValue(value: any) {            
    return value.primerapellido + " " + value.primernombre;
  } 
  
  inputFormatPersonaListValue(value: any)   {
    if(value.primerapellido) {
      return value.primerapellido + " " + value.primernombre;
    }
    return value;
  }

  resultFormatSocioListValue(value: any) {            
    return value.cedula;
  } 
  
  inputFormatSocioListValue(value: any)   {
    if(value.primerapellido) {
      return value.primerapellido + " " + value.primernombre;
    }
    return value;
  }

  removeSocioLote(socio: Persona) {
    console.log('METODO: removeSocioLote()');
    console.log('socio: ');
    console.log(socio);

    const index = this.socios.indexOf(socio);
    if (index > -1) {
      this.socios.splice(index, 1);
    }
    console.log(this.socios); 
  }

}
