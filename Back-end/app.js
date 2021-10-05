const express = require('express');
const bodyParser = require('body-parser');  
const mongoose = require('mongoose');

const adminsRoutes = require('./routes/admins');
const teachersRoutes = require('./routes/teachers');
const studentsRoutes = require('./routes/students');
const authRoutes = require('./routes/auth');
const coursesRoutes = require('./routes/courses');

// Express configuration
const app = express();

app.use(bodyParser.json());  // parsing request data 

app.use((req, res, next) => {  // solving CORS security problem for every path
    res.setHeader("Access-Control-Allow-Origin", "*");  // allow anyone to access our resources
    res.header("Access-Control-Allow-Credentials", true);
    res.setHeader(
      "Access-Control-Allow-Headers", 
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Headers");  // added Authorization for token
    res.setHeader(
      "Access-Control-Allow-Methods", 
      "GET, POST, PATCH, PUT, DELETE, OPTIONS");  // allowed methods
  
    if (req.method === 'OPTIONS') {
      res.status(200);
    }
  
    next();
});

// MongoDB configuration
mongoose.connect(`mongodb+srv://mep-digital-backend:${ process.env.MONGO_ATLAS_PWD }@cluster0.73m17.mongodb.net/mep-digital?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas!");
  })
  .catch(() => {
    console.log("Failed to connect to MongoDB Atlas!");
});


app.use("/api/admins", adminsRoutes);
app.use("/api/teachers", teachersRoutes);
app.use("/api/students", studentsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/courses", coursesRoutes);

app.use('/', (req, res, next) => {
    res.status(200).json({ message: "Hi from MEP Digital!" });
});

module.exports = app;








