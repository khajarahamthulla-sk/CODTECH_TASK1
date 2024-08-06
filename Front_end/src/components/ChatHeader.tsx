import React from "react";

interface ChatHeaderProps {
  user: any;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ user }) => {
  return (
    <div className="chat-header p-1 bg-yellow-500 text-black font-bold pl-6">
      {user ? user.name : "Select a user to start chatting"}
    </div>
  );
};

export default ChatHeader;
