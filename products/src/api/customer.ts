import { ProductService } from '../services/product-service';

import express, { Request, Response, NextFunction } from 'express';
import { userAuth } from './middleware/auth'


export const Product = (app:express.Application)=>{
    const productService = new ProductService();
    app.post('/create', userAuth, async (req: Request, res: Response,next:NextFunction) => { 
        try {
            const { name,
                price,
                type,
                desc,
                banner,
                unit,
                available,
                suplier
             } = req.body;
            const product = await productService.Create({
                name,
                price,
                type,
                desc,
                banner,
                unit,
                available,
                suplier });
            return res.status(201).json(product);
        } catch (error) {
            next(error)
        }
    })
}
    