const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/config');
const auth = require('../middleware/jwtauth');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', auth, (req, res) => {
  res.json({ success: true, user: req.user });
});

router.post('/apply/:id', auth, upload.single('pdf'), async (req, res) => {
  try {
    const { id } = req.params;
    const file = req.file;
    const { subject, message } = req.body;
    if (!file) return res.status(400).jsom({ success: false, message: "No file uploaded" });
    const sql = "UPDATE users SET pdf = ?,subject= ? ,message=?  WHERE id = ?";
    db.query(sql, [file.buffer, subject, message, id], (err, result) => {
      if (err) { console.log(err); return res.status(500).json({ success: false, message: "database problem" }) };
      res.status(200).json({ success: true, message: "File uploaded successfully!" });
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "server problem" })
  }
});

router.post('/login', async (req, res) => {
  try {
    const { mail, pass } = req.body;

    if (!mail || !pass) {
      return res.status(401).json({ success: false, message: "Please Enter Credentials" });
    }

    db.query('SELECT * FROM users WHERE email=?', [mail], async (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Server Problem" });
      }

      if (results.length === 0) {
        return res.status(400).json({ success: false, message: "Invalid credentials" });
      }
      const user = results[0];
      const isValidPassword = await bcrypt.compare(pass, user.password);
      if (!isValidPassword) {
        return res.status(400).json({ success: false, message: "Invalid credentials" });
      }

      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });

      const { password, ...userWithoutPassword } = user;

      res.status(200).json({
        success: true,
        message: 'Successfully logged in',
        user: userWithoutPassword
      });
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Problem" });
  }
});


router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({ success: false, message: "Please Enter Credentials" });
    }
    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
    }
    db.query('SELECT * FROM users WHERE email=?', [email], async (err, results) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Server Problem" });
      }
      if (results.length > 0) {
        return res.status(400).json({ success: false, message: "User already exists" });
      }
      try {
        const hashpass = await bcrypt.hash(password, 10);
        db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashpass], (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: "Server Problem" });
          }
          res.status(201).json({ success: true, message: "Successfully created account" });
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Hashing problem" });
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Problem" });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ success: true, message: "Logged out successfully" });
});

module.exports = router;