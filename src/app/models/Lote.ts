import {Injectable, OnInit} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Lote {
    codigolote: Number;
    codigoreferencia: String;
    codigoreferenciaanterior: String;
    codigopersona: Number;
    primernombre: String;
    segundonombre: String;
    primerapellido: String;
    segundoapellido: String;
  }