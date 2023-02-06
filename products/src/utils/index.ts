import { hash, genSalt, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/';
import { Request } from 'express';

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

