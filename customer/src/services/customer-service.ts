
import { CustomerRepository } from '../database';
import { ItemProduct } from '../database/respository/customer-respository-dto';
import { FormatData, GenerateSalt, GenerateSignature, HashPassword, validatePassword } from '../utils';
import { IAddress, IOrder, IUser, IUserSignIn, IWish } from './customer-service-dto';

//business logic

export class CustomerService{
    customerRepository;
    constructor() {
        this.customerRepository = new CustomerRepository;
    }
    async Signup(userInput:IUser) {
        const { email, name, password, phone, } = userInput;
        try {
            const existingCustomer = await this.customerRepository.FindCustomer(email);
            if (existingCustomer) { 
                throw new Error("Customer already exists");
            }
            //Generate salt
            const salt = await GenerateSalt();
            //Hash password
            const userHashedPassword = await HashPassword(password, salt);
            //Create customer
            const customer = await this.customerRepository.createCustomer({
                email,
                name,
                password: userHashedPassword,
                phone,
                salt,
                cart: [],
                wishlist: [],
                orders: [],
                
            });
            const token = await GenerateSignature({ email, });
            return FormatData({ customer, token });
           
        } catch (error) {
            console.log(error, ":Error creating customer signup")
            throw new Error(`${error}`);
        }
    }


    async SignIn(userInput: IUserSignIn) {
        const { email, password } = userInput;
        try { 
            const existingCustomer = await this.customerRepository.FindCustomer(email);
        
            if (existingCustomer) { 
                const isMatch = await validatePassword(password, existingCustomer.password, existingCustomer.salt);
                if (isMatch) {
                    const token = await GenerateSignature({ email: existingCustomer.email, });
                    return FormatData({ id: existingCustomer._id, token });
                } else { 
                    throw new Error("Password is incorrect");
                }
              
            } 
            

            return FormatData(null)

        } catch(error) {
            console.log(error,"Error signing in")
            throw new Error(`${error}`);

        }

    
    
    }

    async AddNewAddress(id:string, userInformation:IAddress) {
        const { street, postalCode, city, country } = userInformation;
        try {

            const addressResult = await this.customerRepository.createAddress({ id, street, postalCode, city, country })
            return FormatData(addressResult);
            
        } catch (error) {
            throw new Error("Data Not Found");
        }
    }


    async GetProfile(id:string) {
        try {
            const existingCustomer = await this.customerRepository.findCustomerById(id);
            return FormatData(existingCustomer);
        } catch (error) {
            throw new Error("Data Not Found");
        }
    }

    async GetShoppingDetails(id:string) {
        try {
            const existingCustomer = await this.customerRepository.findCustomerById(id);
            if (existingCustomer) {
               FormatData(existingCustomer)
            } else {
                return FormatData(null)
           }
        } catch (error) {
            throw new Error("Data Not Found");
        }
    }
    async GetWishList(customerId:string) {
        try {
            const wishListItems = await this.customerRepository.WishList(customerId);
            return FormatData(wishListItems);
        } catch (error) {
            throw new Error("Data Not Found");
        }
    }

    async AddToWishList(customerId: string, product:IWish) {
        try {
            const wishListResult = await this.customerRepository.AddWishList(customerId, product);
            return FormatData(wishListResult);

        } catch (error) {
            
        }
    }


    async ManageCart(customerId:string, productId:any, qty:number, isRemove:boolean) {
        
        const cartResult = await this.customerRepository.AddToCart(customerId, productId, qty, isRemove);
        return FormatData(cartResult);
    }
    
    async ManageOrder(customerId: string, order:IOrder) {
        try {
            const orderResult = await this.customerRepository.AddOrderToProfile(customerId, order);
            return FormatData(orderResult);

        } catch (error) {
            throw new Error("Data not found");            
        }
    }

    async SubscribeEvent(payload:any) {
        payload = JSON.parse(payload);
        const { event, data } = payload;
        const{ customerId, product, order, qty, isRemove } = data;
        
        switch (event) {
            case 'ADD_TO_WISHLIST':
            case 'REMOVE_FROM_WISHLIST':
                this.AddToWishList(customerId, product);
                break;
            case 'ADD_TO_CART':
                this.ManageCart(customerId, product, qty, false);
                break;
            case 'REMOVE_FROM_CART':
                this.ManageCart(customerId, product, qty, true);
                break;
            case 'CREATE_ORDER':
                this.ManageOrder(customerId, order);
                break;
            default:
                break;
       }
    }
}

