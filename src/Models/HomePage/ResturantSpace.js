// models/Footer.js
import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";

const SpaceSchema = new mongoose.Schema({
  Htext: { 
    type: String, 
    required: true 
  },
  SpaceImg:{
    type: String, 
    required: true 
  },
  Dtext:{
    type: String, 
    required: true 
  },
});
const ResturantSpaceSchema = new SCHEMA(
  {
   Htext:{
        type: String,
      required: true,
   }, 
   space:[SpaceSchema]
  },
  { timestamps: true }
);

export const ResturantSpace = mongoose.model("ResturantSpace", ResturantSpaceSchema);
export default ResturantSpace;