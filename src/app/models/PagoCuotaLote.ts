import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PagoCuotaLote {
    codigopagocuotalote: Number;
    codigodeposito: Number;
    codigolote: Number;
    codigocuota: Number;
    codigoreunion: Number;    
    valorpagocuotalote: Number;
    estado: String;
    fecharegistro: Date;    
  }