import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";

import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config();

const app = express();

// ---------- MIDDLEWARE ----------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ FINAL CORS CONFIG (PRODUCTION SAFE)
app.use(cors({
    origin: [
        "http://localhost:5173",
        process.env.FRONTEND_URL   // https://work-able.vercel.app
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ HANDLE PREFLIGHT REQUESTS
app.options("*", cors());

// ---------- ROUTES ----------
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// ---------- SERVER ----------
const PORT = process.env.PORT || 8000;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running at port ${PORT}`);
        });
    } catch (error) {
        console.error("DB connection failed:", error);
        process.exit(1);
    }
};

startServer();
