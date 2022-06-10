const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const groceryRoutes = require('./routes/Grocery')
const port = process.env.PORT || 5000;

const { Liquid } = require('liquidjs')

//SET UP VIEW ENGINE
const engine = new Liquid({
    root: __dirname, // for layouts and partials
    extname: '.liquid'
  })

app.engine('liquid', engine.express()) // register liquid engine
app.set('views', ['./partials', './views']) // specify the views directory
app.set('view engine', 'liquid') // set to default


//CONVERT TO JSON
app.use(express.urlencoded({extended: true}));  //without this below code will not work
app.use(express.json()) // To parse the incoming requests with JSON payloads


//PROMPTS USER TO ENTER USERNAME AND PASSWORD
//STEPS: first time give some password, that will conver to Basic XXXX in console.log(), copy it and past against if()
// function passwordProtected(req, res, next) {
//   res.set("WWW-Authenticate", "Basic realm='Grocery App'")
//   if (req.headers.authorization == "Basic YWRtaW46YWRtaW4=") {
//     next()
//   } else {
//     console.log(req.headers.authorization)
//     res.status(401).send("Try again")
//   }
// }

//BELOW one will be applied to all request from groceryRoutes
// app.use(passwordProtected)

//ROUTES
app.use('/grocery', groceryRoutes)






// app.get("/adminn", passwordProtected, (req,res)=>{
//   res.send("ADMIN PORTALLL....")
// })

//SET UP MONGOOSE CONNECTION
mongoose 
 .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true})   
 .then(() => console.log("MongoDB connected!"))
 .catch(err => console.log(err));


//LISTEN TO PORT
app.listen(port, ()=>{
    console.log("Express is running...")
})

//USING SIMPLE ARRAY

// const todos = ['fork and clone', 'make it better', 'make a pull request']



// app.get('/', function (req, res) {
//   // filtered_todo = todos.filter((v, idx)=>idx!==0)
//     res.render('home', {
//       todos: todos,
//       title: 'Welcome to liquidjs!'
//     })
//   })

// app.post('/', (req,res)=>{
//    const todo_text = req.body.todo_text
//    todos.push(todo_text)
//    res.render('home', {todos:todos})

// })  

// app.get('/delete/:id', (req, res)=>{
//   const id = req.params.id
//   console.log("id",id)
//   // filtered_todo = todos.filter((v, idx)=>idx!==id)
//   todos.splice(id, 1)
//   res.redirect('/')
// })
