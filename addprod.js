
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/add-product', (req, res) => {
    res.send(`
      <form action="/add-product" method="POST">
        <label for="productName">Product Name:</label>
        <input type="text" id="productName" name="productName" required>
        
        <label for="productSize">Product Size:</label>
        <input type="text" id="productSize" name="productSize" required>
        
        <button type="submit">Add Product</button>
      </form>
    `);
  });
app.post('/add-product', (req, res) => {
    const productName = req.body.productName;
    const productSize = req.body.productSize;
  
    console.log('Product Name:', productName);
    console.log('Product Size:', productSize);
  
    res.redirect('/'); 
  });
  app.get('/', (req, res) => {
    res.send('Welcome to the home page!');
  });
  
  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
