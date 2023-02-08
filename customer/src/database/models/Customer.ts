import mongoose from "mongoose";

export interface CustomerInterface {
    email: string;
    name: string;
    password: string;
    phone: string;
    salt: string;
   cart: Array<Object>
}

const CustomerSchema = new mongoose.Schema({
    email: String,
    name: String,
    password: String,
    phone: String,
    salt: String,


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
    ]
    
}, {
    toJSON: {
        transform: (doc, ret) => { 
            delete ret.password;
            delete ret.__v;
           
        }
    },
    timeStamp: true
});

export const Customer = mongoose.model<CustomerInterface>('Customer', CustomerSchema);