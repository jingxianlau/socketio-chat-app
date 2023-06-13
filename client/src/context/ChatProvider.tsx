import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';
import { useNavigate } from 'react-router-dom';

const ChatContext = createContext<User | {}>({});

export interface User {
  email: string;
  name: string;
  pfp: string;
  token: string;
  _id: string;
}

export const ChatProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [user, setUser] = useState<object>({});

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

  return <ChatContext.Provider value={user}>{children}</ChatContext.Provider>;
};

export const ChatState = () => {
  return useContext(ChatContext);
};
