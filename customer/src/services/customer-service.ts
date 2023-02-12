
import { CustomerRepository } from '../database';
import { ItemProduct } from '../database/respository/customer-respository-dto';
import { FormatData, GenerateSalt, GenerateSignature, HashPassword, validatePassword } from '../utils';
import { IUser, IUserSignIn } from './customer-service-dto';

//business logic

export class CustomerService{
    customerRepository;
    constructor() {
        this.customerRepository = new CustomerRepository;
    }
    async Signup(userInput:IUser) {
        const { email, name, password, phone, } = userInput;
        try {
            const existingCustomer = await this.customerRepository.findCustomerByEmail(email);
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
                cart:[]
                
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
            const existingCustomer = await this.customerRepository.findCustomerByEmail(email);
        
            if (existingCustomer) { 
                const isMatch = await validatePassword(password, existingCustomer.password, existingCustomer.salt);
                if (isMatch) {
                    const token = await GenerateSignature({ email: existingCustomer.email, });
                    return FormatData({ id: existingCustomer._id, token });
                } else { 
                    throw new Error("Password is incorrect");
                }
               
            } else {
                throw new Error("Customer does not exist");
            }
            
              



        } catch(error) {
            console.log(error,"Error signing in")
            throw new Error(`${error}`);

        }

    
    
    }

    async ManageCart(customerId:string, productId:any, qty:number, isRemove:boolean) {
        
            const cartResult = await this.customerRepository.AddToCart(customerId, productId, qty, isRemove);
            return cartResult
    }

    async SubscribeEvent(payload:any) {
        payload = JSON.parse(payload);
        const { event, data } = payload;
        const{ customerId, productId, qty, isRemove } = data;
        
        if (event === 'ADD_TO_CART') {
            this.ManageCart(customerId, productId, qty, false)
        }
    }
}

