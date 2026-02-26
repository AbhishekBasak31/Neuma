import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";

const HomeSpecialItemsSchema = new SCHEMA(
  {
   Largetext:{
        type: String,
      required: true, 
   },
   CenterImage:{
     type: String,
      required: true,
   },
    CenterImageName:{
     type: String,
      required: true,
   },
   leftsidetextblockHtext:{
        type: String,
      required: true, 
   },
   leftsidetextblockDtext:{
     type: String,
      required: true,
   },
    rightsidetextblockHtext:{
        type: String,
      required: true, 
   },
   rightsidetextblockDtext:{
     type: String,
      required: true,
   },
   ProductGridHtext:{
        type: String,
      required: true, 
   },
   Product1Img:{
     type: String,
      required: true,
   },
    product1ImgAlt:{
     type: String,
      required: true,
   },
   Product1Name:{
     type: String,
      required: true,
   },
   Product2Img:{
     type: String,
      required: true,
   },
    product2ImgAlt:{
     type: String,
      required: true,
   },
   Product2Name:{
     type: String,
      required: true,
   },
     Product3Img:{
     type: String,
      required: true,
   },
    product3ImgAlt:{
     type: String,
      required: true,
   },
   Product3Name:{
     type: String,
      required: true,
   },
     Product4Img:{
     type: String,
      required: true,
   },
   product4ImgAlt:{
     type: String,
      required: true,
   },
   Product4Name:{
     type: String,
      required: true,
   },

  },{ timestamps: true }
);
export const HomeSpecialItems = mongoose.model("HomeSpecialItems", HomeSpecialItemsSchema);


