import mongoose from "mongoose";

 export interface ProductInterface{
     name: string;
     price: number;
     desc: string;
     banner: string;
     available: boolean;
     suplier: string;
     unit: number,
     type: string
     
}

const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    desc: String,
    banner: String,
    available: Boolean,
    suplier: String,
    unit: String,
    type: String

   

    
}, {
    timestamps:true
})


export const Product = mongoose.model<ProductInterface>('Product', ProductSchema);