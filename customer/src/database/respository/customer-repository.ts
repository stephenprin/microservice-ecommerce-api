import { Address, Customer } from '../models';
import { AddressInterface } from '../models/DTOs/address-dto';
import { CustomerInterface } from '../models/DTOs/customer-dto';
import { IProduct, IWishList } from './customer-respository-dto';

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

    async createAddress({id, street,
        postalCode,
        city,
        country }: AddressInterface) {
        
        try {
            const user = await Customer.findById(id)
            if (!user) {
                throw new Error(`User not found with id: ${id}`);
            }
            const newAddress = new Address({
                street,
                postalCode,
                city,
                country
            });
    
            await newAddress.save();
            user.address?.push(newAddress.id);
    
            await user.save();
            return user;
            
            
        } catch (error:any) {
            throw new Error(`Error encountered creating address ${error}`);
        }
        
    }
    async FindCustomer(email: string) {
        try {
            const exitingCustomer = await Customer.findOne({ email })
            
            return exitingCustomer
        } catch (error) {
            throw new Error(`Email not found`)
        }
    }
    async findCustomerById(id :string) { 
        const exitingCustomer = await Customer.findById({ id }).populate('address');
        return exitingCustomer;
    }

    async WishList(customerId: string) {
        try {
            const user = await Customer.findById(customerId).populate('wishlist')
            return user?.wishlist
        } catch (error) {
            throw new Error(`Error encountered populating wishlist`);
        }
    }

    async AddWishList(customerId: string, {
        id,
        name,
        price,
        banner,
        description,
        available }: IWishList) {
        
            const product = {
                id,name,price,banner,description,available
            }
        try {
          
            const profile = await Customer.findById(customerId).populate('wishlist');

        if (profile) {
            let wishlist = profile.wishlist
            if (wishlist.length > 0) { 
                let isExit = false;

                wishlist.map((item) => {
                    if (item.id.toString() === product.id.toString()) {
                        const index = wishlist.indexOf(item);
                        wishlist.splice(index, 1);
                        isExit = true;
                    }
                });
                if (!isExit) { 
                    wishlist.push(product);
                }
            }
        }
            
        } catch (error) {
            throw new Error("unable to add to cart wishlist");
        }

        
    }

   
    async AddToCart(customerId: string, {
        id, name, price,banner
    }:IProduct, qty:number, isRemove:boolean) { 
        const profile = await Customer.findById(customerId).populate('wishlist');
        if (profile) {
            const cartItem = {
                product: {id, name, price, banner  },
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