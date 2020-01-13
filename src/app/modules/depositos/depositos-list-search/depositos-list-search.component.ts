import { SiblingService } from './../../services-sibling/sibling.service';

import { DepositosService } from './../../../servicios/depositos/depositos.service';
import { Deposito } from './../../../models/Deposito';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-depositos-list-search',
  templateUrl: './depositos-list-search.component.html',
  styleUrls: ['./depositos-list-search.component.css']
})
export class DepositosListSearchComponent implements OnInit {

  public formBusqueda: FormGroup;

  public depositos: Deposito[];

  constructor(
    private formBuilder: FormBuilder,
    private depositosService: DepositosService,
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

    this.depositos = null;

    this.formBusqueda = this.formBuilder.group({
      cedula: [''],
      primernombre: [''],
      primerapellido: [''],
      numerodeposito: ['']
    });
  }

  buscarDepositos() {
    console.log('METODO: buscarDepositos()');
    this.depositosService.readDepositos(this.formBusqueda.value).subscribe((depositos: Deposito[]) => {
      this.depositos = depositos;
      console.log(this.depositos);
      //this.flashMessagesService.show('La busqueda de depositos se realizo correctamente.', { cssClass: 'alert-success', timeout: 4000 });
      this.siblingService.setDepositos(this.depositos);
    });

    
  }

  cancelDepositos() {
    console.log('METODO: cancelDepositos()');
    this.siblingService.setDepositos(null);
    this.createFormBusqueda();
  }

  buscarDepositosFilters() {
    console.log('METODO: DepositoListComponent.buscarDepositosFilters()');

    console.log(this.formBusqueda.value);

    let paramsSearch = this.formBusqueda.value;

    this.depositosService.readDepositos(paramsSearch).subscribe((depositos: Deposito[]) => {
      this.depositos = depositos;
      console.log(this.depositos);
      //this.flashMessagesService.show('La busqueda de depositos se realizo correctamente.', { cssClass: 'alert-success', timeout: 4000 });
    });
  }

}
