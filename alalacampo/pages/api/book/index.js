import dbConnect from "../../../lib/dbConnect";
import Booking from "../../../models/Booking";

export default async function login(req, res) {
  await dbConnect();
  if (req.method === "POST") {
    try {
      const { day, house, name } = req.body;

      if (!day || !house || !name) {
        res.status(400).json({ message: "Missing data" });
      }

      const book = new Booking({ day, house, name });

      await book.save();
      res.status(201).json({ message: "Booked succesfully!" });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  } else {
    // Handle any other HTTP method
    res.status(500).json({ error: "only post" });
  }
}
