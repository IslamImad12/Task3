import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { DataService } from './services/data.service';
import { CustomerTableComponent } from './components/customer-table/customer-table.component';
import { CustomerGraphComponent } from './components/customer-graph/customer-graph.component';
import { TransactionChartComponent } from './components/transaction-chart/transaction-chart.component';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  declarations: [
    AppComponent,
    CustomerTableComponent,
    CustomerGraphComponent,
    TransactionChartComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    MatDialogModule,
    MatSliderModule,
  ],
  providers: [
    DataService,
    { provide: MAT_DIALOG_DATA, useValue: {} }, // Provide MatMdcDialogData if needed
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
