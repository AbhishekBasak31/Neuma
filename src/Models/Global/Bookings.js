import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";

const BookingSchema = new SCHEMA(
  {
   
    name: {
      type: String,
      required: false,
    },
    phone:{
        type: String,
      require: true,
    },
    location: {
      type: String,
      require: false,
    },
    people: {
      type: String,
      require: false,
    },
    date: {
      type: String,
      require: false,
    },
  
  },{ timestamps: true }
);
export const Booking = mongoose.model("Booking", BookingSchema);
