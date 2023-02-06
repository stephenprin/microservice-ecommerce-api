import { CustomerRepository } from '../database';
import { FormatData, GenerateSalt, GenerateSignature, HashPassword } from '../utils';
import { IUser } from './customer-service-dto';

//business logic

export class CustomerService{
    customerRepository;
    constructor() {
        this.customerRepository = new CustomerRepository;
    }
    async Signup(userInput:IUser) {
        const { email, name, password, phone } = userInput;
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
                salt
                
            });
            const token = await GenerateSignature({ email, });
            return FormatData({ customer, token });
           
        } catch (error) {
            console.log(error, ":Error creating customer signup")
            throw new Error(`${error}`);
        }
    }
}