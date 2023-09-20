import { Request, Response } from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/Users";
import { generateToken } from "../token/userToken";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "The email already exists" });
    }

    const user = new UserModel({ email, password, role });

    await user.save();

    const token = generateToken({ userId: user._id, email, role: user.role });

    res.json({ token });
  } catch (error: any) {
    console.error(error);
    if (error.errors && error.errors.password) {
      return res.status(400).json({ error: error.errors.password.message });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Incorrect credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect credentials" });
    }

    const token = generateToken({ userId: user._id, email, role: user.role });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
