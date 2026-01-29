import { model, models, Schema } from "mongoose";

const authSchema = new Schema({
   name: { type: String, required: true },
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true },
  claimedDeals: { type: Schema.Types.ObjectId, ref: "claims"},
    verified: {type: Boolean , default: false},
}, { timestamps: true}
);

const Users = models.users || model("users", authSchema);

export default Users;