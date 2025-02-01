import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
export const auhtRequired = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "No token" });
  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid troken" });
    req.user = user;
    next();
  });
};
