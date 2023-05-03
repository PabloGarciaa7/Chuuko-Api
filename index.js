require('dotenv').config();

const path = require('path');
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/routes');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI; 

mongoose.connect(DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(db => console.log("Conexión establecida a BD correctamente"))
    .catch(error => console.log("Error al conectarse a la BD" + error));


app.use(cors());
app.use(express.json());

//Middleware
app.use('/api', apiRoutes);
app.use(express.static(path.join(__dirname,'public')));

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
