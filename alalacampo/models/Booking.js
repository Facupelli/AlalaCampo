import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  house: {type: String, required: true},
  day: [{ type: String, required: [true, "Day is required!"] }],
  name: { type: String, required: [true, "Name is required!"] },
});

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
