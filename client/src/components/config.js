import jwt from "jsonwebtoken";

const token = localStorage.getItem("token");

const payload = jwt.verify(token, "mysecretkey");

const userId = payload.name;

module.exports = {
  userId,
};
