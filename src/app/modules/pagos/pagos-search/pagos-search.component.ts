import { SiblingService } from './../../services-sibling/sibling.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagos-search',
  templateUrl: './pagos-search.component.html',
  styleUrls: ['./pagos-search.component.css']
})
export class PagosSearchComponent implements OnInit {

  constructor(
    private siblingService: SiblingService
  ) { }

  ngOnInit() {
  }

}
