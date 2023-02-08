export interface IProduct{
    _id: string,
    name: string,
    price: number,
    banner: string,
}

export interface ItemProduct{
    product: IProduct,
    unit: number
}