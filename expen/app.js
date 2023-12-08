// app.js
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.routes');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

// Use user routes
app.use(userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
