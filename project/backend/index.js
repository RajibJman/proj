const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://rajibparbat55:<password>@mongodbcluster.pq6t9ky.mongodb.net/?retryWrites=true&w=majority&appName=MongoDbCluster', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

  const userSchema = new mongoose.Schema({
    username: String,
    password: String,
  });

  const User = mongoose.model('User', userSchema);

  app.post('http://localhost:3000/login', async (req, res) => {
    const { username, password } = req.body;
  
    // Find user by username
    const user = await User.findOne({ username });
  
    // If user not found
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  // Generate token
  const token = jwt.sign({ userId: user._id }, 'secretkey');
  
  res.json({ token });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});