import { model, models, Schema } from "mongoose";


const dealsSchema = new Schema({
    title: { type: String, required: true},
    desc: {type: String, required: true },
    category: { type: String,enum: ["Cloud", "Marketing", "Analytics", "Productivity","Support"]},
    isLocked: {type: Boolean , default: false},
    price: { type: Number, required: true},
    eligibility: [{type: String}]
}, { timestamps: true});


const Deals = models.deals || model("deals", dealsSchema);

export default Deals;