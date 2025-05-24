const express = require('express'); //create web server
const cors = require('cors'); //frontend communciation
const mongoose = require('mongoose'); //work with mangoose db

const userRoutes = require('./routes/users');
const itemRoutes = require('./routes/items');

const app = express(); //server instance
const PORT = 5000; // server will listen in port 5000

app.use(cors()); //lets backend accept req from frontend
app.use(express.json()); //bujhcha in json pattern data sent haru

mongoose.connect('mongodb+srv://nibedikagautam35:<8LUovxcTeZdTbOa7>@thriftcluster.fjobhsz.mongodb.net/?retryWrites=true&w=majority&appName=ThriftCluster', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(console.error);

  app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes); //When someone visits the root URL
  //  (http://localhost:5000/),
  //  your server responds with "Backend is running!".

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  //Your app starts listening on port 5000 and prints a message with the URL
});