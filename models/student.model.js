const mongoose = require('mongoose');

let schemaStudent = mongoose.Schema({
  firstname: String,
  lastname: String,
  age: String,
  email: String,
  phone: Number,
});

var student = mongoose.model('student ', schemaStudent);

var url = 'mongodb://localhost:27017/University';

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

exports.postUpdateStudent = (_id, firstname, lastname, age, email, phone) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        return student.updateOne({ _id: id }, { firstname: firstname, lastname: lastname, email: email, phone: phone });
      })
      .then(() => {
        mongoose.disconnect();
        resolve('Updated!');
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
