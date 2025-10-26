const express = require('express');
const router = require('./routers/routes');
const cors = require('cors');
const dotenv = require('dotenv');
const cookie = require('cookie-parser');
const app = express();

dotenv.config();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookie());
app.use('/', router);

app.listen(5000, () => {
  console.log("this app is running on port 5000");
})