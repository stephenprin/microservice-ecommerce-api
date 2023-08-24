export interface CustomerInterface {
    email: string;
    name: string;
    password: string;
    phone: string;
    salt: string;
    address: Array<string>;
    wishlist: {
        id: string;
        name?: string;
        price?: number;
        banner?: string;
        description?: string;
        available?: boolean
    }[]
    cart: Array<string | number>;
    orders: {
        id: string;
    amount: string;
    date: Date;
    }[]
}