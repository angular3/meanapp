import { OrderService } from './order.service';
import { NavigationEnd, Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { MaterialInstance, MaterialService } from '../shared/classes/material.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
  providers: [OrderService]
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('modal') modalRef?: ElementRef
  modal!: MaterialInstance;
  isRoot: boolean = true;

  constructor(private router: Router, private order: OrderService) { }

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
  }

  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef!)
  }

  onOpen() {
    this.modal.open?.();
  }

  onCancel() {
    this.modal.close?.();
  }

  onSubmit() {
    this.modal.close?.();
  }
}
