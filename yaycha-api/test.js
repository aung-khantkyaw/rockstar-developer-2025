const jwt = require("jsonwebtoken");

const secret = "laz!est@nt";
const data = { name: "aung", bio: "aung bio" };

//generate token
const token = jwt.sign(data, secret);
console.log(token);

//decode token
const decode = jwt.verify(token, secret);
console.log(decode);
