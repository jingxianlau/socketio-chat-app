import { RequestHandler } from 'express';
import { User } from '../models/User';
import generateToken from '../utils/auth/generateToken';
import { compareSync, hashSync } from 'bcrypt';

export const signup: RequestHandler = async (req, res) => {
  const { name, email, password, pfp } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ err: 'Please Enter all the Fields' });
  }

  const duplicate = await User.findOne({ email });
  if (duplicate) {
    return res.status(409).json({ err: 'Email already in use' });
  }

  const hash = hashSync(password, 10);

  const user = await User.create({ name, email, password: hash, pfp });

  if (user) {
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      pfp: user.pfp,
      token: generateToken(user._id)
    });
  } else {
    return res.status(400).json({ err: 'Failed to create user' });
  }
};

export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ err: 'User does not exist' });
  }

  const validPassword = compareSync(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ err: 'Incorrect Password' });
  }

  return res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    password: user.password,
    pfp: user.pfp,
    token: generateToken(user._id)
  });
};

export const searchForUser: RequestHandler = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: 'i' } },
          { email: { $regex: req.query.search, $options: 'i' } }
        ]
      }
    : {};

  if (!req.user) {
    return res.status(401).json({ err: 'User not Authenticated' });
  }

  const users = await User.find(keyword)
    .find({ _id: { $ne: req.user._id } })
    .select('-password');
  return res.send(users);
};
