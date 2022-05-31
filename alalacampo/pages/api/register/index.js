import bcrypt from "bcrypt";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";

export default async function register(req, res) {
  await dbConnect();
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;

      const isUserExist = await User.findOne({ email });

      if (isUserExist) {
        return res.status(400).json({ error: "Email already registered" });
      }

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      const user = new User({ email, passwordHash });

      const newUser = await user.save();
      res.status(201).json(newUser); // 201 succes when creating
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  } else {
    res.status(500).json({ error: "only post" });
  }
}
