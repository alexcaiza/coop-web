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
    valorasistencia: String;
    nombrereunion: String;
    valormulta: Number;
  }