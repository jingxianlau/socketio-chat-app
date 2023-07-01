export interface User {
  email: string;
  name: string;
  pfp: string;
  token: string;
  _id: string;
}

export interface Message {
  sender: User;
  content: string;
  chat: Chat;
  timestamp: string;
  _id: string;
}

export interface Chat {
  chatName: string;
  isGroupChat: boolean;
  users: User[];
  groupAdmins: User[];
  latestMessage: Message;
  _id: string;
}

export interface ChatContextObject {
  user?: User;
  selectedChat?: Chat;
  setSelectedChat?: React.Dispatch<React.SetStateAction<Chat>>;
  chats?: Chat[];
  setChats?: React.Dispatch<React.SetStateAction<Chat[]>>;
}

export interface ChatState {
  user: User;
  selectedChat: Chat;
  setSelectedChat: React.Dispatch<React.SetStateAction<Chat>>;
  chats: Chat[];
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
}
