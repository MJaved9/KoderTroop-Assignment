const { Router} = require("express");
require("dotenv").config();
const { todoModel } = require("../Model/Todo.model");
const TodosController = Router();

TodosController.get("/", async (req, res) => {
  const todo = await todoModel.find();
  res.send(todo);
});

TodosController.post("/create", async (req, res) => {
  const {title,discriptions} = req.body;
  const task = new todoModel({
    title,
    discriptions
  });
  try {
    await task.save();
    res.send("Todo Created..");
  } catch (err) {
    res.send({ msg: "Something wrong..", err: err,"title":title,"DIS":discriptions });
  }
});

TodosController.delete("/delete/:todoId", async (req, res) => {
  const { todoId } = req.params;
  const deleteTodo = await todoModel.findByIdAndDelete({ _id: todoId });
  if (deleteTodo) {
    res.send("deleted");
  } else {
    res.send("could't deleted..");
  }
});

TodosController.patch("/edit/:todoId", async (req, res) => {
  const { todoId } = req.params;
  const updateTodo = await todoModel.findOneAndUpdate(
    { _id: todoId },
    { ...req.body }
  );
  if (updateTodo) {
    res.send("Updated");
  } else {
    res.send("could't Updated..");
  }
});
TodosController.get("/:id", async (req, res) => {
  const { id } = req.params;
  const data = await todoModel.findById({ _id: id });
  if (data) {
    res.send(data);
  } else {
    res.send("Not Found");
  }
});

module.exports = {
  TodosController,
};
