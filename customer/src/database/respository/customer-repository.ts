import { Customer,CustomerInterface } from '../models';
import { IProduct } from './customer-respository-dto';

export class CustomerRepository {
    async createCustomer({
        email,
        name,
        password,
        phone,
        salt,
    
    }: CustomerInterface) {
        try {
            const createCustomer = await Customer.create({
                email,
                name,
                password,
                phone,
                salt
        
            });
            return createCustomer;
        } catch (error) {
            console.log(error, ":Error creating customer")
       
        }
    }

    async findCustomerByEmail(email: string) { 
        const exitingCustomer = await Customer.findOne({ email });
        return exitingCustomer;
    }
   
    async AddToCart(customerId: string, {
        _id, name, price,banner
    }:IProduct, qty:number, isRemove:boolean) { 
        const profile = await Customer.findById(customerId).populate('cart');
        if (profile) {
            const cartItem = {
                product: {_id, name, price, banner  },
                unit: qty
            };
            let cartItems = profile.cart;
            if (cartItems.length > 0) {
                let isExist = false;
                cartItems.map((item:any) => { 
                    if (item.product._id.toString() === _id.toString()) {
                        if (isRemove) {
                            cartItems.splice(cartItems.indexOf(item), 1);
                        } else {
                            item.unit = qty;
                        }
                        isExist = true;
                    }
                });
                if(!isExist) {
                    cartItems.push(cartItem);
                } else {
                   cartItems.push(cartItem);
                }
                profile.cart = cartItems;
                const cartSaveResult = await profile.save();
                return cartSaveResult;
            }
            throw new Error("unable t add to cart");
        }
    }
}