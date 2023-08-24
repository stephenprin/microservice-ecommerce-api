import mongoose from "mongoose";
import { CustomerInterface } from "./DTOs/customer-dto";




const CustomerSchema = new mongoose.Schema({
    email: String,
    name: String,
    password: String,
    phone: String,
    salt: String,
    address: [
        {
            type: mongoose.Schema.Types.ObjectId,
               ref: "Address", required: true
        }
    ],

    cart: [
        {
            product: {
                id: { type: String, required: true },
                name: { type: String },
                price: { type: Number },
                banner: { type: String },
            },
            unit:{
                type: Number,
                required: true
            }
        }
    ],
    wishlist: [
        {
            id: { type: String, required: true },
            name: { type: String },
            price: { type: Number },
            banner: { type: String },
            description: { type: String },
            available:{ type: Boolean}
        }
    ],
    orders: [
        {
            id: { type: String, required: true },
            amount: { type: String },
            date: { type: Date, default:Date.now() },
          
        }
    ]
    
}, {
     toJSON: {
        transform(doc, ret) { 
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
     },
    timeStamp: true
});

export const Customer = mongoose.model<CustomerInterface>('Customer', CustomerSchema);