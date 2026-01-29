import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
    getAdminJobs,
    getAllJobs,
    getJobById,
    postJob
} from "../controllers/job.controller.js";

const router = express.Router();

// ✅ PUBLIC ROUTES (no auth needed)
router.get("/get", getAllJobs);
router.get("/get/:id", getJobById);

// ✅ PROTECTED ROUTES (admin only)
router.post("/post", isAuthenticated, postJob);
router.get("/getadminjobs", isAuthenticated, getAdminJobs);

export default router;
