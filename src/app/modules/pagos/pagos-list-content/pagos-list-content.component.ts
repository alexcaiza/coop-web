import { SiblingService } from './../../services-sibling/sibling.service';
import { CuotasService } from './../../../servicios/cuotas/cuotas.service';
import { Cuota } from './../../../models/Cuota';

import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError, map, filter  } from 'rxjs/operators';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
//import { FlashMessagesService } from 'angular2-flash-messages';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Pago } from 'src/app/models/Pago';
import { PagosModalComponent } from '../pagos-modal/pagos-modal.component';

@Component({
  selector: 'app-pagos-list-content',
  templateUrl: './pagos-list-content.component.html',
  styleUrls: ['./pagos-list-content.component.css']
})
export class PagosListContentComponent implements OnInit {

  public siblingPagos$: Observable<any>;

  public pagos: Pago[];

  @ViewChild(PagosModalComponent, { static: false }) 
  public childModalPago: PagosModalComponent;

  constructor(
    private formBuilder: FormBuilder,
    private siblingService: SiblingService
  ) {
    this.siblingPagos$ = siblingService.siblingPagos$;
  }

  ngOnInit() {
    console.log('METODO: ngOnInit()');

    this.siblingPagos$.subscribe(data => {
      this.pagos = data;
    });
  }

  openModalPago(pago) {
    console.log(pago);
    console.log(this.childModalPago);
    this.childModalPago.openModal(pago);
  }

}
