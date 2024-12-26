import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';

@Component({
  standalone:true,
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-manufacture',
  templateUrl: './manufacture.component.html',
  styleUrls: ['./manufacture.component.scss'],
})
export class ManufactureComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}