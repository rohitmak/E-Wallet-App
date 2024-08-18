import Account from "../models/account.model.js";

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
  const session = await Account.startSession();
  session.startTransaction();
  try {
    const { amount, toUserId } = req.body;

    // Validate amount and toUserId
    if (!amount || !toUserId) {
      throw new Error("Invalid input");
    }

    // Fetch the accounts within the transaction
    const fromAccount = await Account.findOne({ userId: req.userId }).session(
      session
    );

    if (!fromAccount || fromAccount.balance < amount) {
      await session.abortTransaction();
      return res.status(404).json({
        message: "Insufficient balance/Invalid fromAccount",
      });
    }

    const toAccount = await Account.findOne({ userId: toUserId }).session(
      session
    );

    if (!toAccount) {
      await session.abortTransaction();
      return res.status(404).json({
        message: "Invalid account",
      });
    }

    // Perform the balance update operations
    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);

    await Account.updateOne(
      { userId: toUserId },
      { $inc: { balance: amount } }
    ).session(session);

    // Commit the transaction
    await session.commitTransaction();

    res.json({
      message: "Transfer successful",
    });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ message: "Server Error", error: error.message });
  } finally {
    session.endSession(); // End the session regardless of success or error
  }
};
