import { RequestHandler } from 'express';
import { Chat } from '../models/Chat';
import { User } from '../models/User';
import { assertHasUser } from '../middleware/authMiddleware';

export const fetchChats: RequestHandler = async (req, res) => {
  assertHasUser(req);

  try {
    // find user's chats
    const chats = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } }
    });

    for (let i = 0; i < chats.length; i++) {
      await chats[i].populate('users', '-password');
      await chats[i].populate('latestMessage');
      await User.populate(chats[i], {
        path: 'latestMessage.sender',
        select: '-password'
      });
    }

    return res.json(chats);
  } catch (err) {
    return res.status(400).json({ err });
  }
};

export const accessChat: RequestHandler = async (req, res) => {
  assertHasUser(req);

  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ err: 'Missing Parameters' });
  }

  const user = await User.findById(id);
  if (!user) {
    return res.status(400).json({ err: 'Invalid User' });
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
      users: [req.user._id, id],
      groupAdmins: []
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

export const accessGroup: RequestHandler = async (req, res) => {};

export const addToGroup: RequestHandler = async (req, res) => {};

export const removeFromGroup: RequestHandler = async (req, res) => {};

export const renameChat: RequestHandler = async (req, res) => {};
