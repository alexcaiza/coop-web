import {Injectable, OnInit} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Persona {
    codigopersona: Number;
    cedula: String;
    primernombre: String;
    segundonombre: String;
    primerapellido: String;
    segundoapellido: String;

    // datos del lote
    codigoreferencia: String;
    manzana: String;
    numerolote: String;
    codigoreferenciaanterior: String;
    manzanaanterior: String;
    numeroloteanterior: String;
  }