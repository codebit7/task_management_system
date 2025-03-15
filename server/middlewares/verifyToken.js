const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");

       
        
        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        if (token.startsWith("Bearer ")) {
            token = token.split(" ")[1]; 
          }
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET|| "defaultKey");
        req.user = decodedUser;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};

module.exports = verifyToken;
