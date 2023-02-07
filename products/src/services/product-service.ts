import { ProductRepository } from '../database';
import { FormatData, GenerateSalt, GenerateSignature, HashPassword } from '../utils';
import { IProduct } from './product-service-dto';

//business logic

export class ProductService{
    productRepository;
    constructor() {
        this.productRepository = new ProductRepository;
    }
    async Create(productInput:IProduct) {
        const {    name,
            price,
            type,
            desc,
            banner,
            unit,
            available,
            suplier} = productInput;
        try {
            
            const product = await this.productRepository.createProduct({
                name,
        price,
        type,
        desc,
        banner,
        unit,
        available,
        suplier

            });
            
            return FormatData(product);
           
        } catch (error) {
            console.log(error, ":Error creating customer signup")
            throw new Error(`${error}`);
        }
    }
}