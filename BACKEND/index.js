import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // allow cross server access in the network
import cookieParser from "cookie-parser";

import connectDB from "./src/config/mongo.config.js";

import shortUrl from "./src/routes/shortUrl.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import userRoutes from "./src/routes/user.route.js";

import { redirectFromShortUrl } from "./src/controller/shortUrl.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import { attachUser } from "./src/utils/attachUser.js";

const app = express();

dotenv.config({ path: "./.env" });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(attachUser);

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://linksnap-six.vercel.app", 
      "https://eniglink.enigmavssut.in",
      "https://url-shortener-frontend-ten-psi.vercel.app"
    ],
    credentials: true,
  })
);

await connectDB();

app.listen(process.env.PORT, () => {
  console.log(`listening to port ${process.env.PORT}`);
});

app.get("/", (req, res) => {
  res.send("getting request");
});
app.use("/api/create", shortUrl);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.get("/:shorturl", redirectFromShortUrl);

app.use(errorHandler);

