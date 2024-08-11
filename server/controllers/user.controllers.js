import zod from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import Account from "../models/account.model.js";

// USER SIGN-UP
const signupBody = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

export const registerUser = async (req, res) => {
  try {
    const { success } = signupBody.safeParse(req.body);
    if (!success) {
      return res.status(403).json({
        message: "Incorrect inputs",
      });
    }

    const { username, password, firstName, lastName } = req.body;

    const existingUser = await User.findOne({
      username,
    });

    if (existingUser) {
      return res.status(403).json({
        message: "Email/Username already taken",
      });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      password: hashedPassword,
      firstName,
      lastName,
    });

    const userId = user._id;

    await Account.create({
      userId,
      balance: 1 + Math.random() * 10000,
    });

    const token = jwt.sign(
      {
        userId,
      },
      process.env.JWT_SECRET
    );

    res.status(201).json({
      message: "User created successfully",
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// USER SIGN-IN
const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

export const loginUser = async (req, res) => {
  try {
    const { success } = signinBody.safeParse(req.body);
    if (!success) {
      return res.status(403).json({
        message: "Incorrect inputs",
      });
    }

    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        message: "User doesn't exists",
      });
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET
    );

    res.status(200).json({
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// USER UPDATE
export const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

export const updateUser = async (req, res) => {
  try {
    const { success } = updateBody.safeParse(req.body);
    if (!success) {
      return res.status(403).json({
        message: "Error while updating information",
      });
    }

    const { password, firstName, lastName } = req.body;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.findByIdAndUpdate(req.userId, {
      password: hashedPassword,
      firstName,
      lastName,
    });

    res.status(200).json({
      message: "User Updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const filter = req.query.filter || "";

    const users = await User.find({
      $or: [
        {
          firstName: {
            $regex: filter,
          },
        },
        {
          lastName: {
            $regex: filter,
          },
        },
      ],
    });

    res.json({
      user: users.map((user) => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
