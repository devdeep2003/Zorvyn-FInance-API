import { verifyToken } from "../utils/jwtFunctions.js";

export const authenticateUser = (req, res, next) => {
  const token = req.cookies.JWTtoken;

  if (!token) {
    return res.status(401).json({ message: "Token invalid" });
  }

  try {
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ message: "Token Invalid" });
    }

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Response" });
  }
};
