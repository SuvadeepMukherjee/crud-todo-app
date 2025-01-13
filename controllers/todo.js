const path = require("path");
const Todo = require("../models/Todo");
const rootDir = require("../util/path");

module.exports.getTodos = async (req, res) => {
  try {
    console.log("Entering get todos");

    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.postTodos = async (req, res) => {
  try {
    console.log("Submit todos");
    console.log(req.body);

    const todo = await Todo.create({
      text: req.body.text,
      //complete: req.body.complete,
      category: req.body.categoryValue,
    });

    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.updateTodos = async (req, res, next) => {
  try {
    console.log("update todos");

    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    await todo.updateOne(req.body);
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.deleteTodos = async (req, res, next) => {
  try {
    console.log("delete todos");
    const result = await Todo.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getTodoPage = (req, res, next) => {
  const filePath = path.join(rootDir, "views", "index.html");
  res.sendFile(filePath);
};
