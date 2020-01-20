import {Injectable, OnInit} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Alert {
  
  public type: AlertType;
  public message: string;
  public timeout: number = 5000;

  constructor(type: AlertType, message: string){
    this.type = type;
    this.message = message;
  }
}

export enum AlertType {
  Success,
  Error,
  Info,
  Warning
}