import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";

const EventPartnerSchema = new SCHEMA(
  {
    Img:{
      type: String,
      required: true,
    },
    altText:{
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const EventPartner = mongoose.model("EventPartner", EventPartnerSchema);
