const express = require('express');

const app = express();

const port = 3000;
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const RouteStudent = require('./routers/student.route');
const RouteUser = require('./routers/user.route');
app.use('/', RouteUser);

app.use('/', RouteStudent);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
