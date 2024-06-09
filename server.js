require('dotenv').config()

const express = require('express')
const app = express()
const mysql = require('mysql2')
const bodyParser = require('body-parser')
const session = require('express-session')
const path = require('path')
const PORT = process.env.PORT || 3000

const connection = mysql.createConnection({
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_NAME
})

connection.connect(err => {
   if (err) {
       console.error('Error connecting to MySQL:', err)
       process.exit(1) // Exit the process if there's an error connecting to the database
   }
   console.log('Connected to MySQL')
})

// Middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
   secret: 'secret_key',
   resave: false,
   saveUninitialized: true
}))
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.post('/login', (req, res) => {
   const { username, password } = req.body

   connection.query('SELECT * FROM employees WHERE UserName = ?', [username], (err, results) => {
       if (err) {
           console.error('Error querying the database:', err)
           return res.status(500).send('Error querying the database')
       }

       if (results.length === 0) {
           console.log('No user found with username:', username)
           return res.status(401).send('Invalid username or password')
       }

       const user = results[0]
       if (user.Password !== password) {
           console.log('Incorrect password for user:', username)
           return res.status(401).send('Invalid username or password')
       }

       req.session.user = user
       res.redirect('/user-info')
   })
})

// Catch-all route for SPA navigation
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
