import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';
import { useNavigate } from 'react-router-dom';
import { Chat, ChatContextObject, ChatState, User } from '../types';

const ChatContext = createContext<ChatContextObject>({});

export const ChatProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [user, setUser] = useState<User | undefined>();
  const [selectedChat, setSelectedChat] = useState<Chat | undefined>();
  const [chats, setChats] = useState<Chat[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    let userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      navigate('/');
      return;
    }

    let userObj: User = JSON.parse(userInfo);
    setUser(userObj);
  }, [navigate]);

  return (
    <ChatContext.Provider
      value={{ user, selectedChat, setSelectedChat, chats, setChats }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const GetChatState = () => {
  const chatState = useContext(ChatContext);
  if (!chatState.user || !chatState.setSelectedChat || !chatState.setChats) {
    return null;
  } else {
    const { user, selectedChat, setSelectedChat, setChats, chats } = chatState;
    return {
      user,
      selectedChat,
      setSelectedChat,
      setChats,
      chats
    } as ChatState;
  }
};
