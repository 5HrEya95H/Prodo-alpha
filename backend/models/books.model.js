import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userBookSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    enum: ["journal", "notes"],
    required: true,
  },

  isLocked: {
    type: Boolean,
    default: false,
  }, 
  
  entries: [
    {
      heading: String,
      content: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});



// userBookSchema.pre("save", async function () {

//   if (!this.isModified("password")) return;
//   this.password = await bcrypt.hash(this.password, 10);

// });

// userBookSchema.methods.generatetoken = async function () {
//   const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
//   return token;
// };

// userBookSchema.methods.comparePassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };


const UserBook = mongoose.model("UserBook", userBookSchema);


export default UserBook;