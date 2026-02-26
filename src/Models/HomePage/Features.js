import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";

const SocialMediaCardSchema = new SCHEMA({
  Htext: { 
    type: String, 
    required: true 
  },
  Image:{
    type: String, 
    required: true 
  
  },  
  link:{
    type: String, 
    required: true
  }
});
const SocialMediaSecSchema = new SCHEMA(
  {
    Htext:{
        type: String,
      required: true,
   },
     
    SocialMedia:[SocialMediaCardSchema]

  },{ timestamps: true }
);
export const SocialMediaSec = mongoose.model("SocialMediaSec", SocialMediaSecSchema);