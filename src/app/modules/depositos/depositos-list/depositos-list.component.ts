import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-depositos-list',
  templateUrl: './depositos-list.component.html',
  styleUrls: ['./depositos-list.component.css']
})
export class DepositosListComponent implements OnInit {

  constructor() {    
  }

  ngOnInit() {
    console.log('METODO: ngOnInit()');
  }

}
