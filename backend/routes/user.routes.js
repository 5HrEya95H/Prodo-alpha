
import express from "express";
const router = express.Router();

import {
  loginUser,
  registerUser,
  profileUser,
  logout,
} from "../controllers/user.controller.js";

import { AuthUser, bookAuth } from "../middleware/auth.middleware.js";
import { createEntry, editEntry, journalIsLockedHandlers, veiwBook } from "../controllers/books.controller.js";
import {
  createTask,
  completeTask,
  updateTask,
  viewTodo,
} from "../controllers/todo.controller.js";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile",AuthUser, profileUser);
router.post("/logout", AuthUser, logout);


//book
router.post("/journal/unlock/:bookID", AuthUser, journalIsLockedHandlers);
router.get("/book/view/:bookID", AuthUser, bookAuth, veiwBook);
router.put("/book/edit/:bookID/:entryID", AuthUser, bookAuth, editEntry);
router.post("/book/createEntry/:bookID", AuthUser, bookAuth, createEntry);


//todo
router.get("/todo/view/:todoID", AuthUser, viewTodo);
router.post("/todo/createTask/:todoID", AuthUser, createTask);
router.put("/todo/:todoID/:taskID/completed", AuthUser, completeTask);
router.put("/todo/:todoID/:taskID/update", AuthUser, updateTask);

export default router;