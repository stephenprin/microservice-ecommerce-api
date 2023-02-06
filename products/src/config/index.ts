import dotenv from 'dotenv';

if(process.env.NODE_ENV !== 'prod') {
    const configFile = `.env.${process.env.NODE_ENV}`;
    
    require('dotenv').config({ path: configFile });
} else {
    dotenv.config();
}
export const PORT = process.env.PORT as string;
export const DATABASE_URL = process.env.DATABASE_URL as string
export const JWT_SECRET = process.env.JWT_SECRET as string