const router = require('express').Router();
const routerModel = require('../models/user.model');

router.post('/register', (req, res, next) => {
  routerModel
    .registerUser(req.body.username, req.body.email, req.body.password)
    .then(msg => res.send(msg))
    .catch(err => res.send(err));
});

router.post('/login', (req, res, next) => {
  routerModel
    .Login(req.body.email, req.body.password)
    .then(tocken => res.send(tocken))
    .catch(err => res.send(err));
});
module.exports = router;
