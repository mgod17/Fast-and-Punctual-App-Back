import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secretToken = process.env.SECRET_TOKEN || "FAST&FURIUS";

const generateToken = (payload: object): string => {
  return jwt.sign(payload, secretToken, { expiresIn: "2h" });
};

const validateToken = (token: string): any | null => {
  try {
    return jwt.verify(token, secretToken);
  } catch (error) {
    return null;
  }
};


export { generateToken, validateToken };