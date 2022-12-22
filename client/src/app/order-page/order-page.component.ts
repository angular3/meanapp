import { Subscription } from 'rxjs';
import { Order, OrderPosition } from './../shared/interfaces';
import { OrderService } from './order.service';
import { NavigationEnd, Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { MaterialInstance, MaterialService } from '../shared/classes/material.service';
import { OrdersService } from '../shared/services/orders.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
  providers: [OrderService]
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('modal') modalRef?: ElementRef
  modal!: MaterialInstance;
  oSub?: Subscription;
  isRoot: boolean = true;
  pending: boolean = false;

  constructor(private router: Router, public order: OrderService, private ordersService: OrdersService) { }

  ngOnInit(): void {
    // because here we need to check all the time what exactely router is and change header every time 
    // - we want to subscribe to router events stream
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        //  we have pretty much events when routes changing,
        //  so here we change our variable only once in the end
        this.isRoot = !this.router.url.includes('/order/');
      }
    })
  }

  ngOnDestroy(): void {
    this.modal.destroy?.();
    if (this.oSub) {
      this.oSub.unsubscribe(); // here we unsubscribe from our subscriptions on this page(comp)
    }
  }

  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef!)
  }

  removePosition(orderPosition: OrderPosition) {
    this.order.remove(orderPosition);
  }

  onOpen() {
    this.modal.open?.();
  }

  onCancel() {
    this.modal.close?.();
  }

  onSubmit() {
    this.pending = true
    const order: Order = {
      list: this.order.list.map(item => {
        delete item._id ;
        return item;
      }),
    }
    this.oSub = this.ordersService.create(order).subscribe(
      newOrder => {
        console.log(newOrder.order);
        
        MaterialService.toast(`Order #${newOrder.order} has been added!`);
        this.order.clear();
      },
      error => MaterialService.toast(error.error),
      () => {
        this.modal.close?.();
        this.pending = false;
      }
    );
   
  }
}
