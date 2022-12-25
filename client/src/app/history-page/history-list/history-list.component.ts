import { MaterialInstance, MaterialService } from './../../shared/classes/material.service';
import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Order } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css']
})
export class HistoryListComponent implements OnDestroy, AfterViewInit {
  @Input() orders!: Order[];
  @ViewChild('modal') modalRef!: ElementRef; // here we have reference on our html node

  selectedOrder!: Order;
  modal!: MaterialInstance;

  constructor() { }

  ngOnDestroy() {
    this.modal.destroy?.();
  }

  ngAfterViewInit() { // here we handle modal working
    this.modal = MaterialService.initModal(this.modalRef);
  }

  computePrice(order: Order) {
    return order.list?.reduce((acc, el) => {
      acc += el.cost * el.quantity;
      return acc
    }, 0)
  }

  selectOrder(order: Order) {
    this.selectedOrder = order;
    this.modal.open?.();
  }

  closeModal() {
    this.modal.close?.();
  }

}
