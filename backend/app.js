const express = require('express');
const router = require('./routers/routes');
const app = express();

app.use(express.json());
app.use('/', router);

app.listen(5000, () => {
  console.log("this app is running on port 5000");
})