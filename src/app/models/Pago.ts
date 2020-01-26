import {Injectable, OnInit} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Pago {
    //datos de la cuota
    codigocuota: Number;
    descripcioncuota: String;
    valorcuota: Number;
    fechainicio: Date;
    fechafin: Date;

    //datos de la reunion
    codigoreunion: Number;
    valormulta: Number;
    nombrereunion: String;

    //datos del lote
    codigolote: Number;
    codigoreferencia: String;

    //datos de persona
    codigopersona: Number;
    cedula: String;
    primernombre: String;
    segundonombre: String;
    primerapellido: String;
    segundoapellido: String;

    valorpagocuotalote: Number;
    
    valorpagadocuota: Number;
    valorpagadoreunion: Number;
    valorpagadodeposito: Number;

    valorpendiente: Number;
    
  }