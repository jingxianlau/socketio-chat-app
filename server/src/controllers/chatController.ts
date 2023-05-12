import { RequestHandler } from 'express';
import { Chat } from '../models/Chat';
import { User } from '../models/User';

export const fetchChats: RequestHandler = async (req, res) => {};

export const accessChat: RequestHandler = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ err: 'Missing Parameters' });
  }

  if (!req.user) {
    return res.status(401).json({ err: 'User not Authenticated' });
  }

  // find one-to-one chat
  const chat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: id } } }
    ]
  })
    .populate('users', '-password')
    .populate('latestMessage');

  const repopulatedChat = await User.populate(chat, {
    path: 'latestMessage.sender',
    select: '-password'
  });

  if (repopulatedChat.length > 0) {
    // send existing chat
    return res.json(repopulatedChat[0]);
  } else {
    // create chat
    const chatData = {
      chatName: 'sender',
      isGroupChat: false,
      users: [req.user._id, id]
    };

    try {
      const createdChat = await Chat.create(chatData);

      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        'users',
        '-password'
      );

      return res.status(200).json(fullChat);
    } catch (err) {
      return res.status(400).json({ err });
    }
  }
};

export const createGroup: RequestHandler = async (req, res) => {};

export const addToGroup: RequestHandler = async (req, res) => {};

export const removeFromGroup: RequestHandler = async (req, res) => {};

export const renameChat: RequestHandler = async (req, res) => {};
