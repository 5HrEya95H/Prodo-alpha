import Todo from "../models/todo.model.js";

const createTask = async (req, res) => {
  try {
    const { todoID } = req.params;
    const { taskContent } = req.body;

    if (req.user.Todo.toString() !== todoID) {
      return res.status(403).json({
        message: "unauthorised Axis",
      });
    }

    const todo = await Todo.findById(todoID);
    if (!todo) {
      res.status(402);
    }


    todo.tasks.push({
      content: taskContent,
    });

    await todo.save();

    return res.status(201).json({
      message: "task added suceesfully",
    });
  } catch (error) {
    console.log("error in creating task", error);
    res.status(500).json({
      message: "error in creating task",
      error,
    });
  }
};
const completeTask = async (req, res) => {
  try {
    const { todoID, taskID } = req.params;
    if (req.user.Todo.toString() !== todoID) {
      return res.status(403).json({
        message: "unauthorised Axis",
      });
    }

    const todo = await Todo.findById(todoID);
    if (!todo) {
      res.status(402);
    }

    todo.tasks.id(taskID).isCompleted = true;

    await todo.save();

    return res.status(201).json({
      message: "task is marked as completed",
      updatedTodo: todo,
    });
  } catch (error) {
        console.log("error in marking task as completed", error);
        res.status(500).json({
          message: "error in marking task as completed",
          error,
        });
  }
};
const updateTask = async (req, res) => {
  try {
    const { todoID, taskID } = req.params;
    const {newContent} = req.body;
    if (req.user.Todo.toString() !== todoID) {
      return res.status(403).json({
        message: "unauthorised Axis",
      });
    }

    const todo = await Todo.findById(todoID);
    if (!todo) {
      res.status(402);
    }

    todo.tasks.id(taskID).content = newContent;

    await todo.save();

    return res.status(201).json({
      message: "task updated succesfully",
      updatedTodo: todo,
    });
  } catch (error) {
        console.log("error in updating task", error);
        res.status(500).json({
          message: "error in updating task",
          error,
        });
  }
};
const viewTodo = async (req, res) => {
  try {
    const { todoID } = req.params;

    if (req.user.Todo.toString() !== todoID) {
      return res.status(403).json({
        message: "unauthorised Axis",
      });
    }

    const todo = await Todo.findById(todoID);
    if (!todo) {
      res.status(402);
    }

    return res.send(201).json({
      message: "here is your Todo",
      todo
    });
  } catch (error) {
    console.log("error in fetching todo", error);
    res.status(500).json({
      message: "error in fetching todo",
      error,
    });
  }
}
export { createTask, completeTask, updateTask, viewTodo};
