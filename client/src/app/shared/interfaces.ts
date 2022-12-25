export interface User {
    email: string,
    password: string
};

export interface Category {
    name: string,
    imageSrc?: string,
    user?: string,
    _id?: string
}

export interface Message {
    message: string,
};

export interface Position {
    name: string,
    cost: number,
    user?: string,
    category: string,
    _id?: string, // with ? because we setting it on server, when it;s creating
    quantity?: number, // this is virtual property, we use it only on frontend, so we won't pass it to server
}

export interface OrderPosition {
    name: string,
    cost: number,
    quantity: number,
    _id?: string,
}

export interface Order {
    date?: Date,
    order?: number,
    user?: string,
    list?: OrderPosition[],
    _id?: string,
}

export interface Filter {
    start?: Date;
    end?: Date;
    order?: number;
}