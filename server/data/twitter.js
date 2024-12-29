import * as authRepoitory from "../data/auth.js";

export async function getAllTweets() {
  const tweetsWithEmails = await Promise.all(
    authRepoitory.users.map(async (tweet) => {
      console.log(tweet.id);
      const user = await authRepoitory.findByuserId(tweet.id);
      if (!user) {
        throw new Error(`User with id ${tweet.id} not found`);
      }
      const { email } = user;
      return { ...tweet, email };
    })
  );
  return tweetsWithEmails;
}

export async function getByUsername(name) {
  return getAllTweets().then((tweetsWithEmails) => {
    tweetsWithEmails.filter((tweet) => tweet.name === name);
  });
}

export async function getByUserid(id) {
  const found = await authRepoitory.users.find((tweet) => tweet.id === id);
  if (!found) {
    return null;
  }
  const url = `https://${found.name}.com`;

  return { ...found, url };
}

export async function newUser(name, age, id, password) {
  const newUser = {
    name,
    age,
    id,
    password,
    created: new Date().toString(),
  };
  authRepoitory.users = [newUser, ...authRepoitory.users];
  return newUser;
}

export async function updatedUser(id) {
  return authRepoitory.users.find((user) => user.id === id);
}

export async function deleteByUser(id) {
  return (authRepoitory.users = authRepoitory.users.filter(
    (user) => user.id !== id
  ));
}
