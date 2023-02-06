import { CustomerService } from '../services/customer-service';

import express, { Request, Response,NextFunction } from 'express';


export const Customer = (app:express.Application)=>{
    const customerService = new CustomerService();
    app.post('/customer/signup', async (req: Request, res: Response,next:NextFunction) => { 
        try {
            const { email, name, password, phone } = req.body;
            const customer = await customerService.Signup({ email, name, password, phone });
            return res.status(201).json(customer);
        } catch (error) {
            next(error)
        }
    })
}
    