const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/config');


router.post('/', (req, res) => {
  const { token } = req.body;

})

router.post('/login', async (req, res) => {
  try {
    const { mail, pass } = req.body;
    if (!mail || !pass) { res.status(401).json({ success: false, message: "Please Enter Credentials" }); }
    db.query('SELECT * FROM users WHERE email=?', [mail], (err, results) => {
      if (err) { console.log(err); return res.status(500).json({ success: false, message: "Server Problem DB where" }); }

      if (results.length === 0) { console.log(err); return res.status(400).json({ success: false, message: "Email doesnt exist" }); }
      const user = results[0];
      res.status(200).json({ success: true, message: 'successfully logged In', user });
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Problem" });
  }
})

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) { res.status(401).json({ success: false, message: "Please Enter Credentials" }); }
    db.query('SELECT * FROM users WHERE email=?', [email], async (err, results) => {

      if (err) { return res.status(500).json({ success: false, message: "Server Problem DB where" }); }

      if (results.length > 0) { return res.status(400).json({ success: false, message: "user already exist" }); }
      try {
        const hashpass = await bcrypt.hash(password, 10);

        db.query('INSERT INTO  users (email,password) VALUES (?,?);', [email, hashpass], (err, results) => {
          if (err) { console.log(err); return res.status(500).json({ success: false, message: "Server Problem DB insrt" }); }

          res.status(201).json({ success: true, message: "successfully created account" });
        })
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "hasing problem" })
      }
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Problem w" });
  }
})





module.exports = router;