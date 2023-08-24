import mongoose from "mongoose";
import { AddressInterface } from "./DTOs/address-dto";



const AddressSchema = new mongoose.Schema({
    street: String,
    postalCode: String,
    city: String,
    country: String,

    
    
}, {
     toJSON: {
        transform(doc, ret) { 
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
     },
    timeStamp: true
});

export const Address =  mongoose.model<AddressInterface>('Address', AddressSchema);