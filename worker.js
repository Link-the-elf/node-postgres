const pid = process.pid
const PORT = process.env.PORT || 3000
const express = require('express')
const postRoutes = require('./routes/postRoutes.js')
const personRoutes = require('./routes/personRoutes.js')

const app = express()

app.use(express.json())

app.use('/api/posts', postRoutes)
app.use('/api/persons', personRoutes)

app.listen(PORT, () => console.log(`Worker started. Pid: ${pid}`))