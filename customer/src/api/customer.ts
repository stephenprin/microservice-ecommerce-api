import { CustomerService } from '../services/customer-service';

import express, { Request, Response,NextFunction } from 'express';
import { userAuth } from './middleware';


export const Customer = (app:express.Application)=>{
    const customerService = new CustomerService();
    app.post('/signup', async (req: Request, res: Response,next:NextFunction) => { 
        try {
            const { email, name, password, phone } = req.body;
            const data = await customerService.Signup({ email, name, password, phone });
            return res.status(201).json(data);
        } catch (error) {
            next(error)
        }
    })
    app.post('/signin', async (req: Request, res: Response,next:NextFunction) => { 
        try {
            const { email, password } = req.body;
            
            const data = await customerService.SignIn({ email, password });
            return res.status(200).json(data);
        } catch (error) {
           console.log(error)
        }
    })

    app.post('/address', userAuth, async (req: Request, res: Response) => {
        try {
            const { id } = req.user;
            
        } catch (error) {
            
        }

    })
}
    