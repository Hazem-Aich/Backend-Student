const express = require('express');

const app = express();

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const RouteStudent = require('./routers/student.route');

app.use('/', RouteStudent);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
