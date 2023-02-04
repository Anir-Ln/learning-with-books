const express = require('express')
const app = express()
const phrasesRouter = require('./routes/phrases.routes')

const PORT = 8888 || process.env.PORT

app.use(express.json())

// root endpoint
app.get("/", (req, res, next) => {
  res.json({message: "root endpoint UP"})
})

// other api endpoints
app.use("/phrases", phrasesRouter)


// default response for any other request
app.use((req, res) => {
  res.status(404)
})

// start server
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}...`)
})

// error handling
app.use(function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(err.statusCode || 500).send({message: err.message})
})