import { DepositosService } from './../../../servicios/depositos/depositos.service';
import { Deposito } from './../../../models/Deposito';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-depositos-main',
  templateUrl: './depositos-main.component.html',
  styleUrls: ['./depositos-main.component.css']
})
export class DepositosMainComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    console.log('METODO: ngOnInit()');
  }

}
