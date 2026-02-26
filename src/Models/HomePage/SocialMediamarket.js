import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";

const SocialMediamarketSecSchema = new SCHEMA(
  {
    Htext:{
        type: String,
      required: true,
   },
    Pagename:{
        type: String,
      required: true,
   },
   PageLink:{
    type: String,
      required: true,
   },
   cardImg1:{
     type: String,
      required: true,
   
   },
     card1Name:{
     type: String,
      required: true,
   
   },

    cardImg2:{
     type: String,
      required: true,
   
   },
     card2Name:{
     type: String,
      required: true,
   
   },
    cardImg3:{
     type: String,
      required: true,
   
   },
     card3Name:{
     type: String,
      required: true,
   
   },
  },{ timestamps: true }
);
export const SocialMediamarketSec = mongoose.model("SocialMediamarketSec", SocialMediamarketSecSchema);