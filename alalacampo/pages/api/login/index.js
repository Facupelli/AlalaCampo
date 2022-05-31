import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";

export default async function login(req, res) {
  await dbConnect();
  if (req.method === "POST") {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({ error: "Invalid email" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Invalid Password" });
    }

    const userForToken = {
      id: user._id,
      email: user.email,
      password,
    };

    const token = jwt.sign(userForToken, process.env.TOKEN_SECRET_WORD, {
      expiresIn: "1d",
    });

    res.json({
      name: user.name,
      email: user.email,
      token,
    });
  } else {
    // Handle any other HTTP method
    res.status(500).json({ error: "only post" });
  }
}
