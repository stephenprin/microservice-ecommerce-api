import mongoose from "mongoose";

 export interface ProductInterface{
     name: string;
     price: number;
     description: string;
     image: string;
     category: string;
     quantity: number;
     available: boolean;
     supplier: string;
     
}

const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    image: String,
    category: String,
    quantity: Number,
    available: Boolean,
    supplier: String,

   

    
}, {
    timestamps:true
})


export const Product = mongoose.model<ProductInterface>('Product', ProductSchema);