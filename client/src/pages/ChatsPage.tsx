import React, { useEffect } from 'react';

const Chats: React.FC = () => {
  const fetchChats = async () => {
    const response = await fetch('http://localhost:4000/api/chat');

    console.log(await response.json());
  };

  useEffect(() => {
    fetchChats();
  });

  return <div>Chat Page</div>;
};

export default Chats;
