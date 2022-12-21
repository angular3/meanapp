import { OrderService } from './../order.service';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PositionsService } from 'src/app/shared/services/positions.service';
import { Position } from 'src/app/shared/interfaces';
import { MaterialService } from 'src/app/shared/classes/material.service';

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.css']
})
export class OrderPositionsComponent implements OnInit {

  positions$!: Observable<Position[]>; // stream positions

  constructor(private route: ActivatedRoute,
    private positionsService: PositionsService,
    private order: OrderService) { }

  ngOnInit(): void {
    this.positions$ = this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
          console.log(params);
          
          return this.positionsService.fetch(params['id'])
          }),
        map((positions: Position[]) => { // here we set default value of position quantity
          return positions.map(position => {
            position.quantity = 1;
            return position;
          })
        })
      )

  }

  addToOrder(position: Position) {
    console.log(position);
    this.order.add(position);
    MaterialService.toast(`You add ${position.quantity} item(s)`)
  }

}
