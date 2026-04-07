import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  allocatedBook: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserBook",
    },
  ],
  Todo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Todo",
  }
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.generatetoken = async function(){
  // console.log("Generating token for user:", this);
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
  return token;
}
userSchema.methods.comparePassword = async function(password){
  return await bcrypt.compare(password, this.password);
}


const User = mongoose.model("User", userSchema);


export default User;