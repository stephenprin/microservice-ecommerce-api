export interface IProduct{
    id: string,
    name: string
    price: number
    banner: string
}

export interface IWishList extends IProduct{
   
        description:string
        available:boolean
}

export interface ItemProduct{
    product: IProduct,
    unit: number
}

export interface IOrder{
    id: string;
    amount: string;
    date: Date;
}