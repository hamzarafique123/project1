import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';

@Component({
   schemas:[CUSTOM_ELEMENTS_SCHEMA],
    standalone:true,
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})
export class SalesComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}