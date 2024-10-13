const express = require("express");
const router = express();
const prisma = require("../prismaClient");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/users", async (req, res) => {
  const data = await prisma.user.findMany({
    include: { posts: true, comments: true },
    orderBy: { id: "desc" },
    take: 20,
  });
  res.json(data);
});

router.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  const data = await prisma.user.findFirst({
    where: { id: Number(id) },
    include: { posts: true, comments: true },
  });
  res.json(data);
});

router.post("/users", async (req, res) => {
  const { name, username, bio, password } = req.body;
  if (!name || !username || !password) {
    return res
      .status(400)
      .json({ msg: "name, username and password required" });
  }
  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, username, password: hash, bio },
  });
  res.json(user);
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: "username and password required" });
  }

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (user) {
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      // const token = jwt.sign(
      //   { id: user.id, username: user.username },
      //   process.env.JWT_SECRET,
      //   { expiresIn: "1h" }
      // );
      const token = jwt.sign(user, process.env.JWT_SECRET);
      return res.json({ token, user });
    }
  }

  res.status(401).json({ msg: "incorrect username or password" });
});

router.get("/verify", auth, async (req, res) => {
  const user = res.locals.user;
  res.json(user);
});

module.exports = { userRouter: router };
