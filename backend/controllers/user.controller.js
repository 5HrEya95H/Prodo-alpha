import UserBook from "../models/books.model.js";
import Todo from "../models/todo.model.js";
import User from "../models/user.model.js";
import cookieOptions from "../util/cookieOptions.js";

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).send({ message: "User already exists" });
    }

    const newUser = await User.create({ username, email, password });

    const journal = await UserBook.create({
      userId: newUser._id,
      title: "My Journel",
      type: "journal",
      isLocked: true,
    });
    const notes = await UserBook.create({
      userId: newUser._id,
      title: "My Notes",
      type: "notes",
    });
    const todo = await Todo.create({
      userId: newUser._id,
      title: "My TODO",
    });

    newUser.allocatedBook.push(journal._id, notes._id);
    newUser.Todo = todo._id;
    await newUser.save();

    //cookie setting
    const token = await newUser.generatetoken();
    res.cookie("token", token, cookieOptions);

    const createdUser = await User.findById(newUser._id)
      .select("-password")
      .populate({
        path: "allocatedBook",
        select: "title type isLocked",
      });
    // await newUser.save();
    res.status(201).send({
      message: "User registered successfully",
      token,
      user: createdUser,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send({ message: "Error registering user", error });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid email or password" });
    }
    const token = await user.generatetoken();
    const createdUser = await User.findById(user._id)
      .select("-password")
      .populate({
        path: "allocatedBook",
        select: "title type isLocked",
      });
    res.cookie("token", token, cookieOptions);
    res.status(200).send({
      message: "User logged in successfully",
      token,
      user: createdUser,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).send({ message: "Error logging in user", error });
  }
};

const profileUser = async (req, res) => {
  const user = req.user;

  return res.status(201).send({
    message: "user found",
    user,
  });
};

const logout = async (req, res) => {

  try {
      await UserBook.updateMany(
        { userId: req.user._id, type: "journal" },
        { isLocked: true },
      );

      res.clearCookie("token", cookieOptions);

      res.json({ msg: "Logged out and journal locked" });
  } catch (error) {
    console.log("error in logout", error);
    return res.status(401).json({
      message: "error in logging out",
    })
  }


};
export { registerUser, loginUser, profileUser, logout };
