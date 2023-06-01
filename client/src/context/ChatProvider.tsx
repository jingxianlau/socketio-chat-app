import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';
import { useNavigate } from 'react-router';

const ChatContext = createContext({});

export const ChatProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [user, setUser] = useState<string>('');

  const navigate = useNavigate();

  useEffect(() => {
    let userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      navigate('/');
      return;
    }

    userInfo = JSON.parse(userInfo) as string;
    setUser(userInfo);
  }, []);

  return <ChatContext.Provider value={{}}>{children}</ChatContext.Provider>;
};

export const ChatState = () => {
  return useContext(ChatContext);
};
