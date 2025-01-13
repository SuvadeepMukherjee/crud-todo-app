const router = require("express").Router();
const {
  getTodos,
  postTodos,
  updateTodos,
  deleteTodos,
  getTodoPage,
} = require("../controllers/todo");

router.get("/", getTodoPage);
router.get("/todos", getTodos);
router.post("/todos", postTodos);
router.put("/todos/:id", updateTodos);
router.delete("/todos/:id", deleteTodos);

module.exports = router;
