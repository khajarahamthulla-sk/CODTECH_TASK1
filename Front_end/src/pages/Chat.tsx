import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SearchUser from "../components/SearchUser";
import UserDetails from "../components/UserDetails";
import MessageList from "../components/MessageList";
import ChatHeader from "../components/ChatHeader";
import MessageInput from "../components/MessageInput";

const socket = io("http://localhost:4000");

interface User {
  id: string;
  name: string;
}

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
}

const Chat: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    axios
      .get("http://localhost:4000/current-user")
      .then((response) => setCurrentUser(response.data))
      .catch((error) => console.error(error));

    // Listen for new messages
    socket.on("newMessage", (message: Message) => {
      if (message.senderId === currentUser?.id) return; // Ignore messages sent by the current user
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup listener on unmount
    return () => {
      socket.off("newMessage");
    };
  }, [navigate, currentUser]);

  const handleUserSelect = async (user: User) => {
    setSelectedUser(user);
    socket.emit("join", { userId: user.id });
    try {
      const response = await axios.get(
        `http://localhost:4000/messages/${user.id}`
      );
      setMessages(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!selectedUser || !currentUser || content.trim() === "") return;

    const message = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      receiverId: selectedUser.id,
      content,
      createdAt: new Date().toISOString(),
    };

    try {
      await axios.post("http://localhost:4000/messages", message);
      socket.emit("sendMessage", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className=" pt-10 mt-10  bg-black">
        <div className=" flex items-center  gap-40 bg-black">
          {" "}
          <SearchUser onUserSelect={handleUserSelect} />
          <UserDetails user={selectedUser} />
        </div>

        <ChatHeader currentUser={currentUser} selectedUser={selectedUser} />

        <div className="bg-black">
          <MessageList messages={messages} currentUser={currentUser} />
        </div>
      </div>
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Chat;
