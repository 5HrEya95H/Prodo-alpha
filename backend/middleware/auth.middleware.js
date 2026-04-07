import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import UserBook from "../models/books.model.js";

const AuthUser = async function (req, res, next) {
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "you are not authorized" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findOne({ _id: decoded._id }).select("-password");
  if (!user) {
    return res.status(401).json({ message: "invalid token" });
  }
  req.user = user;

  return next();
};

const bookAuth = async (req, res, next) => {
  const bookID = req.params.bookID;

  const book = await UserBook.findById(bookID);

  if (!book) return res.status(404).json({ msg: "Book not found" });

  // ✅ Owner check
  if (book.userId.toString() !== req.user._id.toString()) {
    return res.status(403).json({ msg: "Unauthorized" });
  }

  // ✅ Lock check only for journal
  if (book.type === "journal" && book.isLocked) {
    return res.status(401).json({ msg: "Journal locked" });
  }

  req.book = book;
  return next();
};

export { AuthUser, bookAuth };
