import { hash, genSalt, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/';
import { Request } from 'express';
import { CustomerInterface } from '../database/models/DTOs/customer-dto';


declare global {
    namespace Express {
      interface Request {
        user: CustomerInterface
      }
    }
  }


export async function GenerateSalt() {
    return await genSalt();
}
export async function HashPassword(password: string, salt: string) { 
    return await hash(password, salt);
}

export async function GenerateSignature(payload:string | object |Buffer) {
    return  jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
}

export async function FormatData(data: unknown) {
    if (data) {
       return data
    } else {
        throw new Error("No data found");
   }
}

export async function validatePassword(enteredPassword: string, savedPassword: string, salt:string) {
    return await HashPassword(enteredPassword, salt)===savedPassword;
}

export async function validateSignature(req:Request | any) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        return true;
        
    } catch (error) {
        return error;
    }
}

