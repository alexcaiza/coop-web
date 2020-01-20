import { MessagesAppService } from './../../../services/messages-app/messages-app.service';
import { SiblingService } from './../../services-sibling/sibling.service';
import { Observable } from 'rxjs';
import { CuotasService } from './../../../servicios/cuotas/cuotas.service';
import { Persona } from './../../../models/Persona';
import { DepositosService } from './../../../servicios/depositos/depositos.service';
import { Deposito } from './../../../models/Deposito';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-depositos-socios-search',
  templateUrl: './depositos-socios-search.component.html',
  styleUrls: ['./depositos-socios-search.component.css']
})
export class DepositosSociosSearchComponent implements OnInit {

  public formBusqueda: FormGroup;

  public personas: Persona[];

  constructor(
    private formBuilder: FormBuilder,
    private cuotasService: CuotasService,
    private siblingService: SiblingService,
    private messagesService: MessagesAppService,
  ) {
    this.createFormBusqueda();
  }

  ngOnInit() {
    console.log('METODO: ngOnInit()');
    //this.despositosSibling.currentMessage$.subscribe(depositos => this.depositos = depositos);
  }

  createFormBusqueda() {
    console.log('METODO: createFormBusqueda()');
    this.formBusqueda = this.formBuilder.group({
      cedula: [''],
      primernombre: [''],
      primerapellido: ['']
    });
  }

  buscarSocios() {
    console.log('METODO: buscarSocios()');
    this.cuotasService.readPersonas2(this.formBusqueda.value).subscribe((personas: Persona[]) => {
      
      this.personas = personas;
      console.log(this.personas);
      
      this.siblingService.setPersonas(this.personas);
      
      if (this.personas) {
        if (this.personas.length > 0) {
          this.messagesService.success('La busqueda se realizo correctamente.');
        } else {
          this.messagesService.warning('No se encontraron registros con los datos de busqueda');
        }
      }

    });    
  }

  cancelSocios() {
    console.log('METODO: cancelSocios()');
    this.siblingService.setPersonas(null);
  }

}
