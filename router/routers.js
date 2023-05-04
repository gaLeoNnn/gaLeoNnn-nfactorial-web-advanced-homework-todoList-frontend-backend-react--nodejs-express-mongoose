const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ToDoList");
}
app.use(bodyParser);
main().catch((err) => console.log(err));

const todoSchema = new mongoose.Schema({
  challenge: String,
  isDone: Boolean,
});

const Tasks = new mongoose.model("Tasks", todoSchema);

const newTask = new Tasks({
  challenge: "go to the university",
  isDone: false,
});

router.get("/", async (req, res) => {
  const data = await Tasks.find({});
  res.send(data);
});

router.post("/add", (req, res) => {
  const newTask2 = new Tasks({
    challenge: req.body.challenge,
    isDone: req.body.isDone,
  });
  newTask2.save();
});

router.delete("/challenge/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Tasks.findByIdAndDelete(id); // удаляем задачу из коллекции по id

    if (!task) {
      return res.status(404).send({ error: "Task not found" });
    }

    res.send({ message: "Task deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Server error" });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(req.body.challenge);
    console.log(id);
    const task = await Tasks.findByIdAndUpdate(
      id,
      {
        challenge: req.body.challenge,
      }
      // { new: true }
    );

    if (!task) {
      return res.status(404).send({ error: "task not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Server error" });
  }
});
module.exports = router;
