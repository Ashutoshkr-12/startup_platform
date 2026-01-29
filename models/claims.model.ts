import { model, models, Schema } from "mongoose";



const claimedDeals = new Schema({
    userId: {type: Schema.Types.ObjectId, ref:"users", required: true},
    deals: { type: Schema.Types.ObjectId, ref: "deals", required: true},
}, { timestamps: true});


const Claims =  models.claims || model("claims", claimedDeals);

export default Claims;