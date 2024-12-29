import "express-async-errors";
import * as authRepoitory from "../data/auth.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config.js";

const saltRounds = 12;

export async function signup(req, res, next) {
  const { id, name, password, age, email } = req.body;
  const signUp = await authRepoitory.findByuserId(id);
  if (signUp) {
    return res.status(409).json({ message: "이미 존재하는 아이디입니다." });
  }
  const hashed = await hashPassword(password);
  const userId = await authRepoitory.newUser({
    id,
    name,
    age,
    email,
    password: hashed,
  });
  const token = createdToken(userId);
  return res.status(201).json({ token, id });
}

export async function logIn(req, res, next) {
  const { id, password } = req.body;
  const found = await authRepoitory.findByuserId(id);

  if (!found) {
    return res
      .status(404)
      .json({ message: "해당 아이디가 존재하지 않습니다." });
  }

  try {
    const isMatch = await verified(password, found.password);
    if (isMatch) {
      const token = createdToken(found);
      return res
        .status(200)
        .json({ token, id: found.id, message: "로그인 성공" });
    }
    return res
      .status(401)
      .json({ message: "아이디 또는 비밀번호를 다시 확인하세요." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "서버가 불안정합니다." });
  }
}

export async function me(req, res, next) {
  const users = authRepoitory.findByuserId(req.id);
  if (!users) {
    return res.status(404).json({ message: "해당 유저를 찾을수 없습니다." });
  }
  return res.status(200).json({ token: req.token, name: users.name });
}

//해쉬
async function hashPassword(password) {
  const hashed = await bcrypt.hash(password, saltRounds);
  return hashed;
}

// 해쉬된 값과 유저가 입력한 비밀번호
async function verified(inputPassword, hashed) {
  const isMatch = await bcrypt.compare(inputPassword, hashed);
  return isMatch;
}

function createdToken(user) {
  return jwt.sign({ id: user.id }, config.accesskey, {
    expiresIn: "1h",
  });
}
