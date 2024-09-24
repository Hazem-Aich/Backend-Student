const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

let schemaUser = mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

var url = process.env.URL;
var privatekey = process.env.PRIVATE_KEY;

var user = mongoose.model('user', schemaUser);

exports.registerUser = (username, email, password) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url)
      .then(() => {
        return user.findOne({ email: email });
      })
      .then(doc => {
        if (doc) {
          mongoose.disconnect();
          reject('we have this user in our database');
        } else {
          return bcrypt.hash(password, 10);
        }
      })
      .then(hpassword => {
        let NewUser = new user({
          username: username,
          email: email,
          password: hpassword,
        });
        return NewUser.save()
          .then(() => {
            mongoose.disconnect();
            resolve('created successfully');
          })
          .catch(err => {
            mongoose.disconnect();
            reject('error creating user');
          });
      })
      .catch(err => {
        reject(err);
      });
  });
};
exports.Login = (email, password) => {
  //+
  return new Promise((resolve, reject) => {
    //+
    mongoose.connect(url).then(() => {
      //+
      user //+
        .findOne({ email: email }) //+
        .then(user => {
          //+
          if (!user) {
            //+
            mongoose.disconnect(); //+
            reject('email not found'); //+
          } else {
            //+
            bcrypt
              .compare(password, user.password) //+
              .then(same => {
                //+
                if (same) {
                  //+
                  let tocken = jwt.sign({ id: user._id, username: user.username }, privatekey, { expiresIn: '1h' }); //+
                  mongoose.disconnect(); //+
                  resolve('connected', tocken); //+
                } else {
                  //+
                  mongoose.disconnect(); //+
                  reject('Invalid password'); //+
                } //+
              }) //+
              .catch(err => {
                //+
                mongoose.disconnect(); //+
                reject(err); //+
              }); //+
          } //+
        }); //+
    });
  }); //-
}; //-
