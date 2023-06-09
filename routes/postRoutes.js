const express = require('express')
const router = express.Router()
const {createPost, getAllPosts} = require('../controllers/post.controller.js')

router
  .route('/')
  .get(getAllPosts)
  .post(createPost)

module.exports = router