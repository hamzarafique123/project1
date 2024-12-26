
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';

@Component({
  selector: 'app-cash',
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.component.scss'],
  standalone:true,
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports:[CommonModule]
  
})
export class CashComponent  implements OnInit {

  currentDate: string = '01/01/2025';
  serialNumber: string = '01/01/2025';
  
  
  formData = {
    customerName: '',
    shopName: '',
    weight: '',
    carat: '',
    finalGold: '',
    cashReceived: '',
    paymentMode: '',
    description: ''
  };

 
  goldTypes = [
    { karat: '18 K', value: '750' },
    { karat: '21 K', value: '875' },
    { karat: '22 K', value: '916' },
    { karat: '24 K', value: '999' }
  ];

  
  paymentMethods = [
    'Cash',
    'Bank Alahli',
    'Bank Alinma',
    'Discount'
  ];

  onSubmit() {
    console.log('Form submitted', this.formData);
  }

  selectGoldType(karat: string) {
    this.formData.carat = karat;
  }

  selectPaymentMethod(method: string) {
    this.formData.paymentMode = method;
  }

  addMore() {
    
    console.log('Add more clicked');
  }
  constructor() { }

  ngOnInit() {}

}
