import express from "express";
import "express-async-errors";

import * as authController from "../controller/auth.js";
// import jwt from "jsonwebtoken";
import { validate } from "../middleware/validator.js";
import { body } from "express-validator";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
const logIn = [
  body("id") //
    .trim()
    .notEmpty()
    .withMessage("아이디를 입력해주세요.")
    .isLength({ min: 3, max: 12 })
    .withMessage("아이디 최소 3글자이상 12글자 이하로 입력해주세요."),
  body("password") //
    .trim()
    .notEmpty()
    .withMessage("패스워드를 입력해주세요"),
  validate,
];
const signUp = [
  ...logIn, //
  body("name")
    .trim()
    .notEmpty()
    .withMessage("이름을 입력해주세요.")
    .isLength({ min: 2 })
    .withMessage("2글자 이상 입력해주세요."),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("이메일을 입력해주세요")
    .isEmail()
    .isLength({ max: 20 })
    .withMessage("이메일 정보 확인"),
  body("age") //
    .trim()
    .notEmpty()
    .withMessage("나이를 입력해주세요"),
  validate,
];

router.post("/signup", signUp, authController.signup);

router.post("/login", logIn, authController.logIn);
router.get("/me", verifyToken, authController.me);

export default router;
