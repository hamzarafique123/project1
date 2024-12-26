import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonList, IonButton, IonHeader, IonLabel, IonMenu, IonItem } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from '../customer/customer.component';
import { CashComponent } from '../cash/cash.component';
import { SalesComponent } from '../sales/sales.component';
import { ExpenseComponent } from '../expense/expense.component';
import { ManufactureComponent } from '../manufacture/manufacture.component';
import { LedgerComponent } from '../ledger/ledger.component';
import { ManufacturereportComponent } from '../manufacturereport/manufacturereport.component';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    IonList,
    IonHeader,
    IonMenu,
    CommonModule,
    CustomerComponent,
    CashComponent,
    SalesComponent,
    ExpenseComponent,
    ManufactureComponent,
    ManufacturereportComponent,
    LedgerComponent,
  ]
})
export class HeaderComponent implements OnInit {
  dropdowns = {
    invoices: false,
    reports: false
  };

  activeComponent: string = 'customer';

  toggleDropdown(dropdownName: 'invoices' | 'reports'): void {
    Object.keys(this.dropdowns).forEach(key => {
      if (key !== dropdownName) {
        this.dropdowns[key as keyof typeof this.dropdowns] = false;
      }
    });

    this.dropdowns[dropdownName] = !this.dropdowns[dropdownName];
  }

  showComponent(componentName: string): void {
    this.activeComponent = componentName;
  }

  constructor() { }

  ngOnInit() {}
}