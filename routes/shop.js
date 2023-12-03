const path = require('path');

const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));
});

module.exports = router;

// with controllers

module.exports = {
  getContactUs: (req, res) => {
    res.render('contactus', { title: 'Contact Us' });
  },
};


