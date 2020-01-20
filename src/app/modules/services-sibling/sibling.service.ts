import { Injectable } from '@angular/core';

import { Observable, Subject, BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SiblingService {

  public subjectDepositos = new BehaviorSubject(null);
  public siblingDepositos$ = this.subjectDepositos.asObservable();

  public subjectPersonas = new BehaviorSubject(null);
  public siblingPersonas$ = this.subjectPersonas.asObservable();
  
  public subjectPagos = new BehaviorSubject(null);
  public siblingPagos$ = this.subjectPagos.asObservable();
  
  public subjectAsistencias = new BehaviorSubject(null);
  public siblingAsistencias$ = this.subjectAsistencias.asObservable();

  public subjectReporteReunionesSociosAucentes = new BehaviorSubject(null);
  public siblingReporteReunionesSociosAucentes$ = this.subjectReporteReunionesSociosAucentes.asObservable();

  constructor() { }

  public setDepositos(data:any) {
    this.subjectDepositos.next(data);
  }

  public setPersonas(data:any) {
    this.subjectPersonas.next(data);
  }

  public setPagos(data:any) {
    this.subjectPagos.next(data);
  }

  public setAsistencias(data:any) {
    this.subjectAsistencias.next(data);
  }
  
  public setReporteReunionesSociosAucentes(data:any) {
    this.subjectReporteReunionesSociosAucentes.next(data);
  }

}
