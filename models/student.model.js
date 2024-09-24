const mongoose = require('mongoose');
require('dotenv').config();
const Joi = require('joi');

const schemaValidator = Joi.object({
  firstname: Joi.string().alphanum().min(3).max(30).required(),
  lastname: Joi.string().alphanum().min(3).max(30).required(),
  age: Joi.number().min(1),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  phone: Joi.number().min(8),
});
let schemaStudent = mongoose.Schema({
  firstname: String,
  lastname: String,
  age: String,
  email: String,
  phone: Number,
});
var url = process.env.URL;

var student = mongoose.model('student ', schemaStudent);

exports.testConnection = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url)
      .then(() => {
        return console.log('connected');
        resolve('connected');
      })
      .catch(err => reject(err));
  });
};

exports.postStudent = (firstname, lastname, age, email, phone) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url)
      .then(() => {
        let validation = schemaValidator.validate({ firstname: firstname, lastname: lastname, age: age, email: email, phone: phone });
        if (validation.error) {
          mongoose.disconnect();
          reject(validation.error.details[0].message);
        }
        let Student = new student({
          firstname: firstname,
          lastname: lastname,
          age: age,
          email: email,
          phone: phone,
        });
        Student.save()
          .then(doc => {
            mongoose.disconnect();
            resolve(doc);
          })
          .catch(err => {
            mongoose.disconnect();
            reject(err);
          });
      })
      .catch(err => reject(err));
  });
};

exports.postUpdateStudent = (id, firstname, lastname, age, email, phone) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        return student.updateOne({ _id: id }, { firstname: firstname, lastname: lastname, age: age, email: email, phone: phone });
      })
      .then(doc => {
        mongoose.disconnect();
        resolve(doc);
      })
      .catch(err => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

exports.getAllStudent = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        return student.find({});
      })
      .then(docs => {
        mongoose.disconnect();
        resolve(docs);
      })
      .catch(err => {
        mongoose.disconnect();
        reject(err);
      });
  });
};
exports.getOneStudent = id => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        return student.findOne({ _id: id });
      })
      .then(docs => {
        mongoose.disconnect();
        resolve(docs);
      })
      .catch(err => {
        mongoose.disconnect();
        reject(err);
      });
  });
};
exports.deleteOneStudent = id => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        return student.deleteOne({ _id: id });
      })
      .then(docs => {
        mongoose.disconnect();
        resolve(docs);
      })
      .catch(err => {
        mongoose.disconnect();
        reject(err);
      });
  });
};
