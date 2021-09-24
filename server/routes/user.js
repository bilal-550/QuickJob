const express = require('express');
const route = express.Router();
const User = require('../models/User');
const employee = require('../models/Employee');
const validator = require('validator').default;
const bcrypt = require('bcrypt');
const configuration = {
  firstname_surname: {
    max: 10,
    canContainSpecialCharacters: false
  },
  password: {
    min: 8,
    max: 128
  }
}

route.post('/signup', async (req, res) => {
  const { firstName, surname, email, password, isEmployee } = req.body;
  const specialCharactersRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`؟’،]+/;
  if (!firstName || !surname || !email || !password) {
    res.status(400);
    return res.json({
      message: 'Some fields are empty.'
    });
  }

  if (!configuration.firstname_surname.canContainSpecialCharacters && (specialCharactersRegex.test(firstName) || specialCharactersRegex.test(surname))) {
    res.status(400);
    return res.json({
      message: 'First name/Surname must not contain special characters.'
    });
  }

  if (!validator.isLength(firstName, { max: configuration.firstname_surname.max }) || !validator.isLength(surname, { max: configuration.firstname_surname.max })) {
    res.status(400);
    return res.json({
      message: 'First name/Surname must be under 50 characters.'
    });
  }

  if (!validator.isEmail(email)) {
    res.status(400);
    return res.json({
      message: 'The provided email is not valid.'
    });
  }

  if (!validator.isLength(password, { min: configuration.password.min, max: configuration.password.max })) {
    res.status(400);
    return res.json({
      message: 'Password is shorter than 8 characters or more than 128 characters.'
    });
  }

  let user = await User.findOne({ email });
  if (user) {
    res.status(409);
    return res.json({
      message: 'A user with this email already exists.'
    });
  }

  let userData = { firstName, surname, email, password };
  if (!isEmployee) {
    try {
      user = await createUser(userData);
      res.status(201);
      return res.json({
        message: 'User successfully created. Signup complete.'
      });
    } catch {
      res.status(500);
      return res.json({
        message: 'An internal server occurred; the user couldn\'t be created.'
      });
    }

  }
})

async function createUser(data) {
  const hashedPassword = await hashString(data.password);
  const user = new User({ password: hashedPassword, ...data });
  try {
    await user.save();
    return user;
  } catch (err) {
    return new Error(err);
  }
}

async function hashString(string) {
  const salt = await bcrypt.genSalt(10);
  const hashedString = await bcrypt.hash(string, salt);
  return hashedString;
}

module.exports = route;