import jwt, { decode } from "jsonwebtoken";
import config from "../config.js";

const AUTH_ERROR = { message: "Authentication Error" };
const accesskey = config.accesskey;

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers["Authorization"];
  if (!(authHeader && authHeader.startsWith("Bearer"))) {
    return res.status(401).json(AUTH_ERROR);
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(404).json({ message: `${token}이 존재하지 않습니다.` });
  }
  jwt.verify(token, accesskey, async (err, decode) => {
    if (err) {
      return console.error({ message: err });
    }
    req.id = decode.id;
    console.log(req.id);
    next();
  });
};
