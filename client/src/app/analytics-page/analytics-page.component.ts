import { Order } from './../shared/interfaces';
import { Observable } from 'rxjs';
import { OrdersService } from './../shared/services/orders.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.css']
})
export class AnalyticsPageComponent implements OnInit {

  constructor() { }

  orders!: Observable<Order[]>

  ngOnInit(): void {

  }

}
