import { Position, OrderPosition } from './../shared/interfaces';
import { Injectable } from "@angular/core";

@Injectable()

export class OrderService {

    public list: OrderPosition[] = [];
    public price = 0;

    private computePrice() {
        this.price = this.list.reduce((acc, el) => {
            acc += el.quantity * el.cost;
            return acc;
        }, 0)
    }

    add(position: Position) {
        console.log(position);
        const orderPosition: OrderPosition = Object.assign({}, {
            name: position.name,
            cost: position.cost,
            quantity: position.quantity!,
            _id: position._id!,
        });

        const candidate = this.list.find(p => p._id === position._id);

        if (candidate) {
            this.list.forEach(el => {
                if (el._id === candidate._id) {
                    el.quantity += orderPosition.quantity;
                }
            })
        } else {
            this.list.push(orderPosition);
        }
        this.computePrice();
       
    }

    remove(orderPosition: OrderPosition) {
        const index = this.list.findIndex(el => el._id === orderPosition._id);
        this.list.splice(index, 1);
        this.computePrice();
    }

    clear() {
        this.list = [],
        this.price = 0, // here we return our order to initial state
        () => console.log(null);
    }
}