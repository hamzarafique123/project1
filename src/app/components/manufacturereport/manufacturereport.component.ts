import { reportsdata } from 'src/app/Interfaces/reportdata';
import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { image } from 'ionicons/icons';
import { DataService } from 'src/app/services/data.service';

@Component({
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-manufacturereport',
  templateUrl: './manufacturereport.component.html',
  styleUrls: ['./manufacturereport.component.scss'],
  imports: [CommonModule],
})
export class ManufacturereportComponent implements OnInit {
  private dataService = inject(DataService);
  reportdata: reportsdata[] = this.dataService.reportdata; 

  public totalSale = 0;
  public totalReceived = 0;
  public totalDues = 0;

  constructor() {}

  ngOnInit() {
    this.calculateTotals();
  }

  private calculateTotals() {
    this.totalSale = this.reportdata.reduce((sum, report) => sum + Number(report.sale || 0), 0);
    this.totalReceived = this.reportdata.reduce((sum, report) => sum + Number(report.received || 0), 0);
    this.totalDues = this.reportdata.reduce((sum, report) => sum + Number(report.dues || 0), 0);
  }
}