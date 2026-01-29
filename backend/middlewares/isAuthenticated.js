import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
    try {
        // ✅ 1. Read token from cookies
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            });
        }

        // ✅ 2. Verify token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // (jwt.verify will throw if invalid or expired)
        req.id = decoded.userId;

        // ✅ 3. Continue to controller
        next();

    } catch (error) {
        console.error("Auth error:", error.message);

        return res.status(401).json({
            message: "Invalid or expired token",
            success: false
        });
    }
};

export default isAuthenticated;
