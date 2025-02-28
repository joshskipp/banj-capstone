const express = require('express');
const router = express.Router();

const { Posts } = require('../models')

// Read a post
router.get('/', async (req, res) => {
    const listOfPosts = await Posts.findAll();
    res.json(listOfPosts);
});
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const post = await Posts.findByPk(id);
    res.json(post);
});

router.post('/', async (req, res) => {
    const post = req.body;
    await Posts.create(post);
    res.json(post);
});

// Update a post 
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { title, postText, username } = req.body;
    try {
      const [updated] = await Posts.update(
        { title, postText, username },
        { where: { id } }
      );
      if (updated) {
        const updatedPost = await Posts.findByPk(id);
        res.json(updatedPost); // Return the updated post
      } else {
        res.status(404).json({ error: 'Post not found' });
      }
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).json({ error: 'Error updating post' });
    }
  });
// Delete a post
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
      await Posts.destroy({ where: { id } });
      res.json({ message: 'Post deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting post' });
    }
  });
module.exports = router;