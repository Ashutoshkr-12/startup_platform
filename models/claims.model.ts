import { model, models, Schema } from "mongoose";



const claimedDeals = new Schema({
    user: {type: Schema.Types.ObjectId, ref:"users", required: true},
    deal: { type: Schema.Types.ObjectId, ref: "deals", required: true},
}, { timestamps: true});


const Claims =  models.claims || model("claims", claimedDeals);

export default Claims;