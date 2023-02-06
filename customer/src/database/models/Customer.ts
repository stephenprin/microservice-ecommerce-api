import mongoose from "mongoose";

 export interface CustomerInterface{
    email: string;
name: string;
password: string;
     phone: string;
     salt: string;
}

const CustomerSchema = new mongoose.Schema({
    email: String,
    name: String,
    password: String,
    phone: String,
    
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