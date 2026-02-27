// models/Footer.js
import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";

const OwnerSchema = new SCHEMA(
  {
    
    Htext:{
  type: String,
      required: true,
    },
    dtext:{
  type: String,
      required: true,
    },
   img:{
        type: String,
      required: true,
   },
    ownername:{
        type: String,
      required: true,
     
   }, 
    Desig:{
        type: String,
      required: true,
   },   
  
  },
  { timestamps: true }
);

export const Owner= mongoose.model("Owner", OwnerSchema);
export default Owner;
