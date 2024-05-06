import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
