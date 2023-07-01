import express from 'express';
import {
  fetchChats,
  accessChat,
  accessGroup,
  addToGroup,
  removeFromGroup,
  renameChat
} from '../controllers/chatController';

const router = express.Router();

// id
router.post('/access', accessChat);

router.get('/', fetchChats);

router.patch('/rename/:id', renameChat);

router.post('/group/access', accessGroup);

router.post('/group/add/:id', addToGroup);

router.patch('/group/remove/:id', removeFromGroup);

router.route;

export default router;
