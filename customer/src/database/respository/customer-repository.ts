import { Customer,CustomerInterface } from '../models';

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
}