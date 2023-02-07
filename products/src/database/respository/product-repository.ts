import { Product,ProductInterface } from '../models';

export class ProductRepository {
    async createProduct({
        name,
        price,
        type,
        desc,
        banner,
        unit,
        available,
        suplier
    
    }: ProductInterface) {
        try {
            const createProduct = await Product.create({
                name,
                price,
                type,
                desc,
                banner,
                unit,
                available,
                suplier

        
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