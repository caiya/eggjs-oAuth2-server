'use strict'

const bcrypt = require('bcryptjs');

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    name: {type: STRING(30), unique: true},
    hashedPassword: STRING,
    passwordResetToken: STRING,
    resetTokenExpires: DATE,
    age: INTEGER,
    lastSignInAt: DATE,
    firstname: STRING,
    lastname: STRING,
  }, {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    freezeTableName: true
  });

  // static methods
  User.register = async function (fields) {
    fields.hashedPassword = hashPassword(fields.password);
    delete fields.password;
    return await this.create(fields);
  }

  User.getUser = async function (name, password) {
    return await this.authenticate(name, password);
  }

  User.authenticate = async function (name, password) {
    let user = await this.findOne({
      where: { name: name },
      attributes: ['id', 'name', 'age', 'firstname', 'lastname', 'hashedPassword']
    });
    if (!user) return null;
    return bcrypt.compareSync(password, user.hashedPassword) ? (delete user.dataValues.hashedPassword && user) : null;
  };

  User.queryUser = async function(params) {
    return await this.findOne({
      where: params,
      attributes: ['id', 'name', 'age', 'firstname', 'lastname']
    })
  }

  // instance methods
  User.prototype.logSignin = async function () {
    await this.update({ lastSignInAt: new Date() });
  }

  return User;
};

function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}