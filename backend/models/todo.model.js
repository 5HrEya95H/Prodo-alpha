import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const todoSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  title: {
    type: String,
    required: true,
    default: "My TODO",
  },

  tasks: [
    {
      content: String,
      isCompleted : {
        type: Boolean,
        default: false,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});



// todoSchema.pre("save", async function () {

//   if (!this.isModified("password")) return;
//   this.password = await bcrypt.hash(this.password, 10);

// });

// todoSchema.methods.generatetoken = async function () {
//   const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
//   return token;
// };

// todoSchema.methods.comparePassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };


const Todo = mongoose.model("Todo", todoSchema);


export default Todo;