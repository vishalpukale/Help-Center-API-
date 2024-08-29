import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db/helpCenterDB.js";
import cardRoutes from "./routes/cards.js"

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

(async () => {
    try {
        // connect to the DB
        await connectDB();

        // middlewares
        app.use(cors());
        app.use(express.json());

        
        app.get("/", async (req, res) => {
            res.send("Help Center Server is Running!");
        });

    
        app.get("/ping", async (req, res) => {
            res.send("Pinged! Help Center Server is Running!");
        });

        
        app.use("/cards", cardRoutes)

        
        app.use((req, res, next) => {
            const error = new Error("Requested URL Not Found!");
            error.status = 404;
            next(error);
        });

        
        app.use((error, req, res, next) => {
            console.error(error);
            res.status(error.status || 500).send({
                success: false,
                message: error.message || "Internal Server Error!",
            });
        });

        
        app.listen(port, () => {
            console.log(`Help Center is Running on Port: ${port}`);
        });

    } catch (error) {
        console.error("Failed to Start Help Center Server: ", error);
    }
})();