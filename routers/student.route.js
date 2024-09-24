const StudentModel = require('../models/student.model');
const router = require('express').Router();

var privatekey = process.env.PRIVATE_KEY;

verifytocken = (req, res, next) => {
  let tocken = req.headers.authorization;
  if (!tocken) {
    res.status(400).json({ message: 'required authorization' });
  }
  try {
    let verif = jwt.verify(tocken, privatekey);
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
};
verifytockenAdmin = (req, res, next) => {
  let tocken = req.headers.authorization;
  let role = req.headers.role;
  if (!tocken || role != 'admin') {
    res.status(400).json({ message: 'required authorization' });
  }
  try {
    let verif = jwt.verify(tocken, privatekey);
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
};
router.post('/addstudent', verifytockenAdmin, (req, res) => {
  StudentModel.postStudent(req.body.firstname, req.body.lastname, req.body.age, req.body.email, req.body.phone)
    .then(msg => res.send(msg))
    .catch(err => res.send(err));
});

router.get('/TestConnection', (req, res, next) => {
  StudentModel.testConnection()
    .then(msg => res.send(msg))
    .catch(err => res.send(err));
});

router.patch('/update/:id', verifytockenAdmin, (req, res, next) => {
  id = req.params.id;

  StudentModel.postUpdateStudent(req.params.id, req.body.firstname, req.body.lastname, req.body.age, req.body.email, req.body.phone)
    .then(doc => res.send(doc))
    .catch(err => res.send(err));
});

// app.use((req,res,next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
// })
router.get('/allstudent', verifytocken, (req, res, next) => {
  StudentModel.getAllStudent()
    .then(students => res.send(students))
    .catch(err => res.send(err));
});
router.get('/student/:id', verifytocken, (req, res, next) => {
  id = req.params.id;
  StudentModel.getOneStudent(id)
    .then(student => res.send(student))
    .catch(err => res.send(err));
});
router.delete('/delete/:id', verifytockenAdmin, (req, res, next) => {
  id = req.params.id;
  StudentModel.deleteOneStudent(id)
    .then(student => res.send(student))
    .catch(err => res.send(err));
});

module.exports = router;
