const mongoose = require('mongoose')
const todosController = require('./controllers/todos_controller')
const Todo = require('./models/todo')

//mongoose.connect('mongodb://localhost:27017/todo-list')
//mongoose.Promise = global.Promise

// todo: include express and body-parser, plugin in the todos controller and start listening

const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost:27017/todo-list', {
  useMongoClient: true
})
mongoose.Promise = global.Promise

const app = express()

app.use(bodyParser.urlencoded({
  extended: true
}))

app.engine('handlebars', exphbs({
  //defaultLayout: 'main',
  //partialsDir: 'views/partials'
}))
app.set('view engine', 'handlebars')

app.get('/', function (req, res) { // set as home.handlebars as home page
  res.render('index')
})

app.get('/createToDo', function (req, res) {
  Todo.find({}, function (err, allTodos) {
    if (err) throw err
    res.render('createToDo', {
      todos: allTodos
    })
  })
})

// listen the the post request, read the form data
app.post('/createToDo', function (req, res) {
  var newTodo = new Todo({
    name: req.body.name,
    description: req.body.description,
    completed: req.body.completed
  })

  newTodo.save(function (err, newTodo) {
    if (err) throw err

    res.redirect('/createToDo')
  })
})

const port = 3000
app.listen(port, function () {
  console.log('running Todo at ' + port)
})



//////////////////

// const express = require('express')
// const exphbs = require('express-handlebars')
// const bodyParser = require('body-parser')
// const mongoose = require('mongoose')
// const Playlist = require('./models/Playlist')
//
// // connect to db
// const url = 'mongodb://localhost:27017/flickies'
//
// mongoose.connect(url, {
//   useMongoClient: true
// })
// mongoose.Promise = global.Promise
//
// const app = express()
//
// app.use(express.static('public'))
// // without this, u can't read req.body
// app.use(bodyParser.urlencoded({
//   extended: true
// }))
//
// app.engine('handlebars', exphbs({
//   defaultLayout: 'main',
//   partialsDir: 'views/partials'
// }))
// app.set('view engine', 'handlebars')
//
// app.get('/', function (req, res) { // set as home.handlebars as home page
//   res.render('home')
// })
//
// app.get('/search', function (req, res) { // set search.handlebars to path "localhost:xxxx/search"
//   res.render('search')
// })
//
// app.get('/playlist', function (req, res) {
//   Playlist.find({}, function (err, allPlaylists) {
//     if (err) throw err
//     res.render('playlist/index', {
//       playlists: allPlaylists
//     })
//   })
// })
//
// // listen the the post request
// // read the form data
// app.post('/playlist', function (req, res) {
//   var newPlaylist = new Playlist({
//     name: req.body.name,
//     priority: req.body.priority
//   })
//
//   newPlaylist.save(function (err, newPlaylist) {
//     if (err) throw err
//
//     res.redirect('/playlist')
//   })
// })
//
// // create a playlist objects
//
// const port = 4000
// app.listen(port, function () {
//   console.log('running flickies at ' + port)
// })
