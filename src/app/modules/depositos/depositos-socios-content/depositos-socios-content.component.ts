import { SiblingService } from './../../services-sibling/sibling.service';
import { Persona } from './../../../models/Persona';
import { CuotasService } from './../../../servicios/cuotas/cuotas.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-depositos-socios-content',
  templateUrl: './depositos-socios-content.component.html',
  styleUrls: ['./depositos-socios-content.component.css']
})
export class DepositosSociosContentComponent implements OnInit {

  public personas: Persona[];

  public siblingPersonas$: Observable<any>;

  constructor(
    private siblingService: SiblingService,
    private cuotasService: CuotasService,
  ) {
    this.siblingPersonas$ = siblingService.siblingPersonas$
   }

  ngOnInit() {
    this.siblingPersonas$.subscribe(data => {
      this.personas = data;
    });
  }

}
