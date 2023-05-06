import React, { useEffect } from 'react';

interface ChatsProps {}

const Chats: React.FC<ChatsProps> = ({}) => {
  const fetchChats = async () => {
    const response = await fetch('/api/chat');

    console.log(response.json());
  };

  useEffect(() => {
    fetchChats();
  });

  return <div>Chat Page</div>;
};

export default Chats;
