import { Reunion } from './../../models/Reunion';
import { Injectable } from '@angular/core';

import { PagoCuotaLote } from '../../models/PagoCuotaLote';
import { Deposito } from './../../models/Deposito';
import { Lote } from './../../models/Lote';
import { Persona } from './../../models/Persona';
import { Cuota } from './../../models/Cuota';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asistencia } from 'src/app/models/Asistencia';

@Injectable({
  providedIn: 'root'
})
export class AsistenciasService {

  PHP_API_SERVER = "http://127.0.0.1:80/angular-php-app/backend/asistencias";

  //XDEBUG_SESSION_START = "?XDEBUG_SESSION_START=ECLIPSE_DBGP&KEY=15764311442171";
  XDEBUG_SESSION_START_1 = "?x=1";
  XDEBUG_SESSION_START_2 = "?XDEBUG_SESSION_START=ECLIPSE_DBGP";

  constructor(private httpClient: HttpClient) {
  }

  readAsistencias(params): Observable<Asistencia[]> {
    return this.httpClient.post<any>(`${this.PHP_API_SERVER}/read_asistencias.php${this.XDEBUG_SESSION_START_1}`, params);
  }

  readReporteReunionesSociosAucentes(params): Observable<Asistencia[]> {
    return this.httpClient.post<any>(`${this.PHP_API_SERVER}/reporte_reuniones_socios_aucentes.php${this.XDEBUG_SESSION_START_1}`, params);
  }

  readReuniones(textSearch): Observable<Reunion[]> {
    return this.httpClient.get<Reunion[]>(`${this.PHP_API_SERVER}/read_reuniones.php${this.XDEBUG_SESSION_START_1}&textSearch=${textSearch}`);
  }
}
