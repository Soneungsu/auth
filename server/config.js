import dotenv from "dotenv";
dotenv.config();

const config = {
  accesskey: process.env.ACCESS_SECRET_KEY,
  port: process.env.PORT || 8080,
};

export default config;
