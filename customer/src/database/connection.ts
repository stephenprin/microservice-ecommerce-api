import mongoose from "mongoose";
import { DATABASE_URL } from "../config"

let isConnected=false


export const databaseConnection = async () => { 
    try {
        mongoose.set('strictQuery', false);
        mongoose.connect(DATABASE_URL);
        isConnected = true;
        console.log("Database connected");
    } catch (error) {
        console.log(error, ":Error connecting to database");
        process.exit(1);
    }
}
