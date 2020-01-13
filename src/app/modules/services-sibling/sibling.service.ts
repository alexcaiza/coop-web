import { Injectable } from '@angular/core';

import { Observable, Subject, BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SiblingService {

  public subjectDepositos = new BehaviorSubject(null);
  public subjectPersonas = new BehaviorSubject(null);
  public subjectPagos = new BehaviorSubject(null);
  
  public siblingDepositos$ = this.subjectDepositos.asObservable();
  public siblingPersonas$ = this.subjectPersonas.asObservable();
  public siblingPagos$ = this.subjectPagos.asObservable();

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

}
