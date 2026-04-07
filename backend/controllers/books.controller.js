import UserBook from "../models/books.model.js";
import User from "../models/user.model.js";

const veiwBook = async (req, res) => {
  return res.status(200).json({
    message: "Here is your journal/Notes data",
    book: req.book,
  });
};

const journalIsLockedHandlers = async (req, res) => {
  const { password } = req.body;

  const user = await User.findById(req.user._id);

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Wrong password" });
  }

  // Unlock journal temporarily
  const journal = await UserBook.findById(req.params.bookID);
  journal.isLocked = false;

  await journal.save();

  res.json({ message: "Journal unlocked successfully" });
};

const editEntry = async (req, res) => {
  try {
    const { newContent, newHeading } = req.body;
    let { entryID } = req.params;

    const book = req.book;

    const entry = book.entries.id(entryID);

    if (!entry) {
      return res.status(401).json({
        message: "entry not found",
      });
    }

    entry.heading = newHeading;
    entry.content = newContent;

    await book.save();

    return res.status(200).json({
      message: "entries updated succesfully",
      newEntry: entry,
    });
  } catch (error) {
    console.log("error in editing entry", error);
    return res.status(500).json({
      message: "Error editing entry",
      error: error.message,
    });
  }
};

const createEntry = async (req, res) => {
  try {
    const { newContent, newHeading } = req.body;

    if (!newHeading || !newContent) {
      return res.status(400).json({
        message: "Heading and content are required",
      });
    }

    const book = req.book;

    book.entries.push({
      heading: newHeading,
      content: newContent,
    });
    await book.save();

    return res.status(201).json({
      message: "new page created with the given heading and content",
      newEntry: book.entries[book.entries.length - 1],
    });
  } catch (error) {
    console.log("error in editing entry", error);
    return res.status(500).json({
      message: "Error editing entry",
      error: error.message,
    });
  }
};

export { veiwBook, journalIsLockedHandlers, editEntry, createEntry};
