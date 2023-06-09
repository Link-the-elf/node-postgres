const db = require('../db.js')

const getAllPosts = async (req, res) => {
  try {
    const posts = await db.query('SELECT * FROM post WHERE user_id = $1', [req.query.user_id])
    res.status(200).json(posts.rows)
  } catch {
    res.status(500).json({"errors": {"post": "error getting posts"}})
  }
}

const createPost = async (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({"errors": {"title": "title cannot be empty"}})
  }

  if (!req.body.content) {
    return res.status(400).json({"errors": {"content": "content cannot be empty"}})
  }

  if (!req.body.user_id) {
    return res.status(400).json({"errors": {"user_id": "user_id cannot be empty"}})
  }

  try {
    const post = await db.query(
      `INSERT INTO post (title, content, user_id) values ($1, $2, $3) RETURNING *`, 
      [req.body.title, req.body.content, req.body.user_id]
    )
    res.status(201).json(post.rows[0])
  } catch {
    res.status(500).json({"errors": {"post": "error creating post"}})
  }
}

module.exports = {
  getAllPosts,
  createPost
}