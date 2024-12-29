import * as twitterRepository from "../data/twitter.js";
import "express-async-errors";

export async function tweets(req, res, next) {
  const name = req.query.name;
  const found = !name
    ? await twitterRepository.getAllTweets()
    : await twitterRepository.getByUsername(name);
  res.status(201).json(found);
}

export async function getTweetsId(req, res, next) {
  const id = req.params.id;
  const found = await twitterRepository.getByUserid(id);
  if (found) {
    return res.status(200).json({ message: `${id}` });
  }
  return res.status(404).json({ messgae: `해당 유저가 없습니다.` });
}

export async function createdUser(req, res, next) {
  const { name, age, id, password } = req.body;
  const newUser = await twitterRepository.newUser(name, age, id, password);
  res.status(201).json(newUser);
}

export async function updatedPw(req, res, next) {
  const id = req.params.id;
  const password = req.body.password;
  const found = await twitterRepository.updatedUser(id);
  if (found) {
    found.password = password;
    return res.status(200).json({ message: "비밀번호가 변경되었습니다." });
  }
  return res.status(404).json({ message: "해당 유저를 찾을수 없습니다." });
}

export async function deletedById(req, res, next) {
  const id = req.params.id;
  const deletedUser = await twitterRepository.deleteByUser(id);
  res.status(200).json(id);
}
