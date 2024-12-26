import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  standalone:true,
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.scss'],
  imports:[CommonModule]
})
export class LedgerComponent  implements OnInit {
  rows = Array(12).fill(0); 

  constructor() { }

  ngOnInit() {}

}