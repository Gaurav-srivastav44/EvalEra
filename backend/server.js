//server Start
require('dotenv').config();// to use .env file  variables in server.js file.
const app = require('./src/app')
const connectDB = require('./src/db/db')

connectDB();

app.listen(3000 , () =>{
  console.log("Server is running on port 3000")
})

//if we use import for dotenv it will give variables as undefined