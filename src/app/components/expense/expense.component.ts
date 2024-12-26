import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';

@Component({
  standalone:true,
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss'],
})
export class ExpenseComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}