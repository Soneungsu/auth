import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import "express-async-errors";
import routerTweets from "./router/twitter.js";
import authTweets from "./router/auth.js";
import config from "./config.js";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan("tiny"));
app.use(cors());

app.use("/tweets", routerTweets);
app.use("/auth", authTweets);

app.listen(config.port, () => {
  console.log(`here is ${config.port}`);
});
