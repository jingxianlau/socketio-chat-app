import express from 'express';
import {
  fetchChats,
  accessChat,
  createGroup,
  addToGroup,
  removeFromGroup,
  renameChat
} from '../controllers/chatController';

const router = express.Router();

router.post('/create', accessChat);

router.get('/', fetchChats);

router.patch('/rename/:id', renameChat);

router.post('/group/create', createGroup);

router.post('/group/add/:id', addToGroup);

router.patch('/group/remove/:id', removeFromGroup);

router.route;

export default router;
