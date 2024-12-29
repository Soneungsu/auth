export let users = [
  {
    name: "jaehoonkim",
    age: "32",
    email: "jaehoon@naver.com",
    password: "rlawogns123",
    id: "david",
  },
  {
    name: "eungsu",
    password: "dkdltm123@",
    age: "32",
    id: "eungsu4633",
    email: "eungsu4633@hanmail.net",
  },
  {
    name: "sewon",
    password: "sewon123@",
    age: "32",
    id: "sewon4633",
    email: "sewon123@naver.com",
  },
];

export async function newUser(user) {
  const created = { ...user, createdAt: Date.now().toString() };
  users = [created, ...users];
  return created;
}

export async function loginUser(id) {
  const found = users.find((user) => user.id === id);
  return found;
}

export async function findByuserId(id) {
  const found = users.find((user) => user.id === id);
  return found;
}
