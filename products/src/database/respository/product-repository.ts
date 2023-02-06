import { Product,ProductInterface } from '../models';

export class ProductRepository {
    async createProduct({
        name,
        price,
        description,
        image,
        category,
        quantity,
        available,
        supplier
    
    }: ProductInterface) {
        try {
            const createProduct = await Product.create({
                name,
                price,
                description,
                image,
                category,
                quantity,
                available,
                supplier

        
            });
            return createProduct;
        } catch (error) {
            console.log(error, ":Error creating product")
       
        }
    }

    // async findProductByName(name: string) { 
    //     const exitingProduct = await Product.findOne({ name });
    //     return exitingProduct;
    // }
}