import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";

const HomeBannerSchema = new SCHEMA(
  {
   Htext1:{
        type: String,
      required: true, 
   },
   Dtext1:{
     type: String,
      required: true,
   },
   Htext2:{
        type: String,
      required: true, 
   },
   Dtext2:{
     type: String,
      required: true,
   },
   Htext3:{
        type: String,
      required: true, 
   },
   Dtext3:{
     type: String,
      required: true,
   },
   Banner1:{
      type: String,
      required: true, 
   },
   Banner1AltText:{
      type: String,
      required: true, 
   },
   Banner2:{
      type: String,
      required: true, 
   },
   Banner2AltText:{
      type: String,
      required: true, 
   },
   Banner3:{
      type: String,
      required: true, 
   },
   Banner3AltText:{
      type: String,
      required: true, 
   },

  },{ timestamps: true }
);
export const HomeBanner = mongoose.model("HomeBanner", HomeBannerSchema);


