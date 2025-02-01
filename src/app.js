import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import tasksRoutes from "./routes/task.routes.js";
import cors from "cors";
const app = express();
const allowedOrigins = [
  "https://prueba-sigma-beryl.vercel.app",
  "https://fazt.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api", authRoutes);
app.use("/api", tasksRoutes);
app.use("/", (req, res) => {
  res.json({ titulo: "Una nueva aventura nos esperaa http://localhost:5173" });
});
export default app;
