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
      //this.flashMessagesService.show('La busqueda de depositos se realizo correctamente.', { cssClass: 'alert-success', timeout: 4000 });
      this.siblingService.setPersonas(this.personas);
    });    
  }

  cancelSocios() {
    console.log('METODO: cancelSocios()');
    this.siblingService.setPersonas(null);
  }

}
