import { RequestHandler } from 'express';
import { User } from '../models/User';
import generateToken from '../utils/auth/generateToken';
import { compareSync, hashSync } from 'bcrypt';
import { assertHasUser } from '../middleware/authMiddleware';

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

  const obj = pfp
    ? { name, email, password: hash, pfp }
    : { name, email, password: hash };

  const user = await User.create(obj);

  if (user) {
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
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
    return res.status(400).json({ err: 'Invalid Email' });
  }

  const validPassword = compareSync(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ err: 'Incorrect Password' });
  }

  return res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    pfp: user.pfp,
    token: generateToken(user._id)
  });
};

export const searchForUser: RequestHandler = async (req, res) => {
  assertHasUser(req);

  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: 'i' } },
          { email: { $regex: req.query.search, $options: 'i' } }
        ]
      }
    : {};

  const users = await User.find(keyword)
    .find({ _id: { $ne: req.user._id } })
    .select('-password');
  return res.json(users);
};
