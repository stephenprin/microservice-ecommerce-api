import { ProductService } from '../services/product-service';

import express, { Request, Response,NextFunction } from 'express';


export const Product = (app:express.Application)=>{
    const productService = new ProductService();
    app.post('/product/create', async (req: Request, res: Response,next:NextFunction) => { 
        try {
            const {name,
                price,
                description,
                image,
                category,
                quantity,
                available,
                supplier,
             } = req.body;
            const product = await productService.Create({ name,price,
                description,
                image,
                category,
                quantity,
                available,
                supplier, });
            return res.status(201).json(product);
        } catch (error) {
            next(error)
        }
    })
}
    