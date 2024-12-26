import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonLabel, IonGrid, IonRow, IonCol, LoadingController, IonModal } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DataService } from './../../services/data.service';
import { customer } from 'src/app/Interfaces/customer';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  standalone: true,
  imports: [IonLabel, IonGrid, IonRow, IonCol, CommonModule, IonModal, ReactiveFormsModule],
})
export class CustomerComponent implements OnInit {
  private dataService = inject(DataService);
  private loadingController = inject(LoadingController);
  private fb = inject(FormBuilder);

  customers: customer[] = this.dataService.customers;
  filteredCustomers: customer[] = [];
  searchTerm = '';
  isModalOpen = false;
  customerForm!: FormGroup;
  selectedIndex: number | null = null;

  ngOnInit() {
    this.initForm();
    this.filteredCustomers = [...this.customers];
  }

  private initForm() {
    this.customerForm = this.fb.group({
      customername: ['', Validators.required],
      shopname: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      tax: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      address: ['', Validators.required],
      city: ['', Validators.required],
    });
  }

  async showLoading(message: string = '') {
    const loading = await this.loadingController.create({
      message: message,
      duration: 600,
      spinner: 'lines',
    });
    await loading.present();
  }

  onSearch({ target: { value } }: any) {
    const searchTerm = value?.trim().toLowerCase() || '';
    this.filteredCustomers = searchTerm
      ? this.customers.filter(({ customername }) => customername?.toLowerCase().includes(searchTerm))
      : [...this.customers];
  }

  openModal(customer?: customer, index?: number) {
    this.isModalOpen = true;
    this.customerForm.reset();
    if (customer && index !== undefined) {
      this.customerForm.patchValue(customer);
      this.selectedIndex = index;
    } else {
      this.selectedIndex = null;
    }
  }

  closeModal() {
    this.isModalOpen = false;
    this.customerForm.reset();
    this.selectedIndex = null;
  }

  async saveCustomer() {
    if (this.customerForm.valid) {
      const data = this.customerForm.value;
      data.customername = data.customername?.toUpperCase();
      data.shopname = data.shopname?.toUpperCase();
      data.address = data.address?.toUpperCase();
      data.city = data.city?.toUpperCase();
      this.selectedIndex !== null
        ? (this.customers[this.selectedIndex] = data)
        : this.customers.push(data);
      this.filteredCustomers = [...this.customers];
      if (this.searchTerm) this.onSearch({ target: { value: this.searchTerm } });
      await this.showLoading('Saving customer...');
      this.closeModal();
    }
  }

  async deleteCustomer(index: number) {
    const actualIndex = this.customers.findIndex(c => c === this.filteredCustomers[index]);
    if (actualIndex > -1) this.customers.splice(actualIndex, 1);
    this.filteredCustomers = [...this.customers];
    if (this.searchTerm) this.onSearch({ target: { value: this.searchTerm } });
    await this.showLoading('Deleting customer...');
  }

  editCustomer(customer: customer, index: number): void {
    this.openModal();
    this.selectedIndex = index;
    this.customerForm.patchValue(customer);
  }
}