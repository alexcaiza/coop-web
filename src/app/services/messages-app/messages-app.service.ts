import { Alert, AlertType } from './../../models/Message';
import { Injectable } from '@angular/core';

import { FlashMessagesService } from 'ngx-flash-messages';

@Injectable({
  providedIn: 'root'
})
export class MessagesAppService {

  public timeout: number = 5000;

  constructor(private flashMessagesService: FlashMessagesService) { }

  public success(message: string) {
    this.addMessages(new Alert(AlertType.Success, message));
  }

  public error(message: string) {
    this.addMessages(new Alert(AlertType.Error, message));
  }

  public info(message: string) {
    this.addMessages(new Alert(AlertType.Info, message));
  }

  public warning(message: string) {
    this.addMessages(new Alert(AlertType.Warning, message));
  }

  addMessages(alert: Alert){
    this.flashMessagesService.show(alert.message, {
      classes: ['alert', this.cssClass(alert)], // You can pass as many classes as you need
      timeout: alert.timeout, // Default is 3000
    });
  }

  cssClass(alert: Alert) {
    if (!alert) {
        return;
    }

    // return css class based on alert type
    switch (alert.type) {
        case AlertType.Success:
            return 'alert-success';
        case AlertType.Error:
            return 'alert-danger';
        case AlertType.Info:
            return 'alert-info';
        case AlertType.Warning:
            return 'alert-warning';
    }
  }

}
