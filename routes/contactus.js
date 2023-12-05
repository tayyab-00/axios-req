const path = require('path');
const fs = require('fs');
const express = require('express');
const router = express.Router();



router.get('/contactus', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views/contactus.html'));
  });
  router.post('/contactus', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
   console.log(name,email);
    res.redirect('/success');
  });
  

  router.get('/success', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/success.html'));
});

module.exports = router;
