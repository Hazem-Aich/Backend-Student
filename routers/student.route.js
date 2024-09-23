const StudentModel = require('../models/student.model');
const router = require('express').Router();

router.post('/addstudent', (req, res) => {
  StudentModel.postStudent(req.body.firstname, req.body.lastname, req.body.age, req.body.email, req.body.phone)
    .then(msg => res.send(msg))
    .catch(err => res.send(err));
});

router.get('/TestConnection', (req, res, next) => {
  StudentModel.testConnection()
    .then(msg => res.send(msg))
    .catch(err => res.send(err));
});

router.post('/update/:id', (req, res, next) => {
  id = req.params.id;

  StudentModel.postUpdateStudent(id, req.body.firstname, req.body.lastname, req.body.age, req.body.email, req.body.phone)
    .then(msg => res.send(msg))
    .catch(err => res.send(err));
});

router.get('/allstudent', (req, res, next) => {
  StudentModel.getAllStudent()
    .then(students => res.send(students))
    .catch(err => res.send(err));
});
router.get('/student/:id', (req, res, next) => {
  id = req.params.id;
  StudentModel.getOneStudent(id)
    .then(student => res.send(student))
    .catch(err => res.send(err));
});

module.exports = router;
