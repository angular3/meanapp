import { MaterialInstance, MaterialService } from './../shared/classes/material.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { OrdersService } from '../shared/services/orders.service';
import { Subscription } from 'rxjs';
import { Order } from '../shared/interfaces';


const STEP = 2; // step of loading new items
@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('tooltip') tooltipRef!: ElementRef;
  tooltip!: MaterialInstance;
  isFilterVisible = false;
  oSub!: Subscription;
  orders: Order[] = [];

  loading: boolean = false;
  reloading: boolean = false;
  isLastOrders: boolean = false;

  offset: number = 0;
  limit: number = STEP;

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.reloading = true;
    this.fetch()

  }

  private fetch() {
    const params = {
      offset: this.offset,
      limit: this.limit,
    }
    this.oSub = this.ordersService.fetch(params)
      .subscribe(orders => {
        this.isLastOrders = orders.length < STEP;
        this.orders = this.orders.concat(orders);
        this.loading = false;
        this.reloading = false;
      }); 
  }

  loadMore() {
    this.loading = true;
    this.offset += STEP;
    this.fetch();
  }

  ngOnDestroy(): void {
    this.tooltip.destroy?.();
    this.oSub.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.tooltip = MaterialService.initTooltip(this.tooltipRef);
  }

}
