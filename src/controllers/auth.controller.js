import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const userFound = await User.find({ email });
    if (userFound.length > 0) {
      return res.status(400).json({ error: ["El email ya existe"] });
    }

    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });
    res.cookie("token", token);
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  const userFound = await User.findOne({ email });
  if (!userFound)
    return res.status(400).json({ error: ["User not Found", "Champion"] });
  const isMatch = await bcrypt.compare(password, userFound.password);
  if (!isMatch) return res.status(400).json({ error: ["Password incorrecta"] });
  const token = await createAccessToken({ id: userFound._id });
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 86400000, // 86400000 ms = 1 día
  });
  res.json(userFound);
};
export const logout = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFind = await User.findById(req.user.id);
  if (!userFind) return res.status(400).json({ message: "No encontrado" });
  console.log(userFind);
  res.send("profile");
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(400).json({ message: "No token" });
  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(400).json({ message: "jajaja casi me engañas" });
    const userFound = await User.findById(user.id);
    if (!userFound)
      return res.status(400).json({ message: "No encontrado el user" });
    return res.json(userFound);
  });
};

export const verifyToken2 = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.send(false);

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401);

    const userFound = await User.findById(user.id);
    if (!userFound) return res.sendStatus(401);

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};
