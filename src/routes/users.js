const express = require('express');
const router = express.Router();
const User = require('../models/User');
const List = require('../models/List');
const Task = require('../models/Task');
const auth = require('../middleware/auth');

router.get('/', auth('ADMIN'), async (req, res) => {
  const { limit = 10, skip = 0 } = req.query;
  try {
    const users = await User.find()
      .select('email role createdAt')
      .limit(Number(limit))
      .skip(Number(skip));
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', auth('ADMIN'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const lists = await List.find({ user: user._id });
    const listIds = lists.map((list) => list._id);
    await Task.deleteMany({ list: { $in: listIds } });
    await List.deleteMany({ user: user._id });
    await User.deleteOne({ _id: user._id });

    res.status(200).json({ message: 'User and their data deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;