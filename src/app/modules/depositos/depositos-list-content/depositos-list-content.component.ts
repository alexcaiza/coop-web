import { SiblingService } from './../../services-sibling/sibling.service';

import { Observable } from 'rxjs';
import { DepositosService } from './../../../servicios/depositos/depositos.service';
import { Deposito } from './../../../models/Deposito';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-depositos-list-content',
  templateUrl: './depositos-list-content.component.html',
  styleUrls: ['./depositos-list-content.component.css']
})
export class DepositosListContentComponent implements OnInit {

  public siblingDepositos$: Observable<any>;

  public formBusqueda: FormGroup;

  @Input()
  public depositos: Deposito[];

  constructor(
    private formBuilder: FormBuilder,
    private depositosService: DepositosService,
    private siblingService: SiblingService
  ) {
    this.createFormBusqueda();
    this.siblingDepositos$ = siblingService.siblingDepositos$;
  }

  ngOnInit() {
    console.log('METODO: ngOnInit()');

    this.siblingDepositos$.subscribe(data => {
      this.depositos = data;
    });
  }

  createFormBusqueda() {
    console.log('METODO: createFormBusqueda()');
    this.formBusqueda = this.formBuilder.group({
      cedula: [''],
      nombres: [''],
      apellidos: [''],
      numerodeposito: ['']
    });
  }

}
