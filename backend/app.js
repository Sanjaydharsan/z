const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const loginRoute = require('./controller/LoginController')
const postRoute = require('./controller/PostController')
const app = express();
const port = 7000;



app.use(cors())
app.use(express.json());



app.use('/', loginRoute);
app.use('/', postRoute);


// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/z')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start the server
app.listen(port, () => {
  console.log(`Server created successfully on port ${port}`);
});


