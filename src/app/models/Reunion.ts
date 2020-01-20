import {Injectable, OnInit} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Reunion {
    //datos de la reunion
    codigoreunion: Number;
    nombrereunion: String;
    fechareunion: Date;
    fecharegistro: Date;
    ordenreunion: Number;
    estado: String;
    usuarioregistro: String;
  }