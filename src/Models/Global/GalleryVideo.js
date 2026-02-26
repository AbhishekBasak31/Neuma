import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";
const VedioSchema = new SCHEMA({
  Videourl: { 
    type: String, 
    required: true 
  },
  altTag:{
     type: String, 
    required: true 
  },
  Htext:{
    type: String, 
    required: true 
  },
  isPopular: { 
    type: Boolean, 
    default: false 
  }
},
{ timestamps: true });

export const GalleryVedio = mongoose.model("GalleryVedio", VedioSchema);
export default GalleryVedio;