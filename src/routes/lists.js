const express = require('express');
const router = express.Router();
const List = require('../models/List');
const Task = require('../models/Task');
const auth = require('../middleware/auth');

router.get('/', auth(), async (req, res) => {
  const { limit = 10, skip = 0 } = req.query;
  try {
    const lists = await List.find({ user: req.user.userId })
      .limit(Number(limit))
      .skip(Number(skip));
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', auth(), async (req, res) => {
  const { name, color } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Name required' });
  }

  try {
    const list = new List({
      name,
      color: color || 'blue',
      user: req.user.userId,
    });
    await list.save();
    res.status(201).json(list);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', auth(), async (req, res) => {
  const { name, color } = req.body;
  try {
    const list = await List.findOne({ _id: req.params.id, user: req.user.userId });
    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }

    list.name = name || list.name;
    list.color = color || list.color;
    await list.save();
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', auth(), async (req, res) => {
  try {
    const list = await List.findOne({ _id: req.params.id, user: req.user.userId });
    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }

    await Task.deleteMany({ list: list._id });
    await List.deleteOne({ _id: list._id });
    res.status(200).json({ message: 'List deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;