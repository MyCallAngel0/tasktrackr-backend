const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const List = require('../models/List');
const auth = require('../middleware/auth');

router.get('/list/:listId', auth(), async (req, res) => {
  const { limit = 10, skip = 0 } = req.query;
  try {
    const list = await List.findOne({ _id: req.params.listId, user: req.user.userId });
    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }

    const tasks = await Task.find({ list: req.params.listId })
      .limit(Number(limit))
      .skip(Number(skip));
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', auth(), async (req, res) => {
  const { title, dueDate, listId } = req.body;
  if (!title || !listId) {
    return res.status(400).json({ message: 'Title and listId required' });
  }

  try {
    const list = await List.findOne({ _id: listId, user: req.user.userId });
    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }

    const task = new Task({
      title,
      dueDate: dueDate ? new Date(dueDate) : null,
      list: listId,
      user: req.user.userId,
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', auth(), async (req, res) => {
  const { title, dueDate, completed } = req.body;
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.userId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.title = title || task.title;
    task.dueDate = dueDate ? new Date(dueDate) : task.dueDate;
    task.completed = completed !== undefined ? completed : task.completed;
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', auth(), async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.userId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await Task.deleteOne({ _id: task._id });
    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;