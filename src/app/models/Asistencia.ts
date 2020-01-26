import {Injectable, OnInit} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Asistencia {    
    //Persona
    codigopersona: Number;
    cedula: String;
    primernombre: String;
    primerapellido: String;

    // Lote
    codigolote: Number;
    codigoreferencia: String;
    codigoreferenciaanterior: String;

    // Reunion
    codigoreunion: Number;
    nombrereunion: String;
    valormulta: Number;

    // Asistencia
    valorasistencia: String;

    // Valores pagados
    valorpagadocuota: Number;
    valorpagadoreunion: Number;
    valorpagadodeposito: Number;

    valorpendiente: Number;
    
  }