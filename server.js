// Rapper API
const express = require('express')
const MongoClient = require('mongodb').MongoClient
const cors = require('cors')
const req = require('express/lib/request')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 8000

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors())

const dbConnectionStr = process.env.DB_STRING

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }).then(
  (client) => {
    console.log(`connected to db`)
    const db = client.db('rapper-name')
    const rapperCollection = db.collection('stage-name')

    // GET
    app.get('/', (req, res) => {
      rapperCollection
        .find()
        .sort({ likes: -1 })
        .toArray()
        .then((data) => {
          res.render('index.ejs', { info: data })
        })
        .catch((err) => console.error(err))
    })

    // POST
    app.post('/addRapper', (req, res) => {
      rapperCollection
        .insertOne({
          stageName: req.body.stageName,
          birthName: req.body.birthName,
          likes: 0,
        })
        .then((result) => {
          console.log(req.body)
          console.log('rapper added')
          res.redirect('/')
        })
        .catch((err) => console.error(err))
    })

    // DELETE
    app.delete('/deleteRapper', (req, res) => {
      console.log(req)
      rapperCollection
        .deleteOne({
          stageName: req.body.stageNameS,
        })
        .then((result) => {
          console.log(req.body.stageNameS)
          res.json('rapper entry deleted')
        })
        .catch((err) => console.error(err))
    })

    // PUT
    app.put('/addOneLike', (req, res) => {
      rapperCollection
        .findOneAndUpdate(
          {
            stageName: req.body.stageNameS,
            birthName: req.body.birthNameS,
            likes: req.body.likeS,
          },
          {
            $set: {
              likes: req.body.likeS + 1,
            },
          },
          {
            sort: { _id: -1 },
            upsert: false,
          }
        )
        .then((result) => {
          console.log(result.value)
          res.json('updated with one like')
        })
        .catch((err) => console.error(err))
    })
  }
)

app.listen(PORT, () => {
  //console.log(`The server is running on Port:${PORT}.`)
})
