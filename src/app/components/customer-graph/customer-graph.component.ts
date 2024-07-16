import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-customer-graph',
  templateUrl: './customer-graph.component.html',
})
export class CustomerGraphComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
