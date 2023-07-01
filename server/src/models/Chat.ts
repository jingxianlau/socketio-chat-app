import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema(
  {
    chatName: {
      type: String,
      trim: true,
      required: true
    },
    isGroupChat: {
      type: Boolean,
      default: false
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
    ],
    groupAdmins: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId
      // ref: 'Message'
    }
  },
  { timestamps: true }
);

export const Chat = mongoose.model('Chat', chatSchema);
