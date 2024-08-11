import Account from "../models/account.model.js";
import mongoose from "mongoose";

export const getBalance = async (req, res) => {
  try {
    const account = await Account.findOne({
      userId: req.userId,
    });

    if (!account) {
      return res.status(404).json({ message: "Account doesn't exists" });
    }

    res.status(200).json({
      balance: account.balance,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// TRANSACTION IN DATABASE (IMPORTANT)

export const transferBalance = async (req, res) => {
  try {
    if (!req.userId || !req.body || !req.body.amount || !req.body.to) {
      return res.status(400).json({
        message: "Invalid request",
      });
    }

    const session = await mongoose.startSession();

    session.startTransaction();

    // Fetch the accounts within the transaction
    const toAccount = await Account.findOne({ userId: req.body.to }).session(
      session
    );

    if (!toAccount) {
      await session.abortTransaction();
      return res.status(404).json({
        message: "Invalid account",
      });
    }

    const fromAccount = await Account.findOne({ userId: req.userId }).session(
      session
    );

    if (!fromAccount || fromAccount.balance < amount) {
      await session.abortTransaction();
      return res.status(404).json({
        message: "Insufficient balance/Invalid fromAccount",
      });
    }

    // Perform the transfer
    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);
    await Account.updateOne(
      { userId: req.body.to },
      { $inc: { balance: amount } }
    ).session(session);

    // Commit the transaction
    await session.commitTransaction();

    res.json({
      message: "Transfer successful",
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
