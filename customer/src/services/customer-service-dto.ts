export interface IUser{
    email: string;
    name: string;
    password: string;
    phone: string;
   
  
}

export interface IUserSignIn { 
    email: string;
    password: string;
}

export interface IAddress{
    
    street:string;
        postalCode:string;
        city:string;
        country:string;
}

export interface IWish{
    id: string,
    name: string
    price: number
    banner: string
   description:string
    available:boolean
}

export interface IOrder{
    id: string;
    amount: string;
    date: Date;
}
