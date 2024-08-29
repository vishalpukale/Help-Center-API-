import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const mongoURI = process.env.MONGO_CONNECTION_STRING;

export const connectDB = async () => {
    if (!mongoURI) {
        console.error("error");
        process.exit(1);
    }

    try {
        await mongoose.connect(mongoURI);
        console.log("DB is Connected!");
    } catch (error) {
        console.error(`DB Error: ${error?.message || "Error Occurred!"}`);
    }
};