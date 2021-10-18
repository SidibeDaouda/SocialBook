import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { useSelector } from "react-redux";
import { io } from "socket.io-client/dist/socket.io.js";
import Contact from "../components/Chat/Contact";
import Message from "../components/Chat/Message";
import Conversation from "../components/Chat/Conversation";
import { isEmpty } from "../utils/utils";

const URL = process.env.REACT_APP_API_URL;

function Messenger() {
  const userCtxId = useContext(UserContext);
  const userData = useSelector((state) => state.userReducer);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const socket = useRef();
  const [conversations, setConversations] = useState([]);
  const [showContact, setShowContact] = useState(true);
  // const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    socket.current = io(URL);
    socket.current.on("msg", (data) => {
      console.log("coucou", data);
    });
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", userData._id);
    // socket.current.on("getUsers", (users) => {
    // setOnlineUsers(
    //   userData.following.filter((f) => users.some((u) => u.userId === f))
    // );
    // });
  }, [userData._id]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`${URL}api/conversations/${userData._id}`);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [userData._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`${URL}api/messages/${currentChat?._id}`);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: userData._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== userData._id
    );

    socket.current.emit("sendMessage", {
      senderId: userData._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post(`${URL}api/messages`, message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  return (
    <div className="flex w-screen overflow-hidden h-screen">
      <div className="h-full">
        <div className="flex w-full justify-between text-gray-700  shadow-md  font-medium">
          <button
            className={`ring-1 ring-gray-100 w-full  ${
              !showContact ? "bg-blue-500 text-white" : "bg-white"
            }`}
            onClick={(e) => {
              e.preventDefault();
              setShowContact(false);
            }}
          >
            Conversations
          </button>
          <button
            className={`ring-1 ring-gray-100 w-full  ${
              showContact ? "bg-blue-500 text-white" : "bg-white"
            }`}
            onClick={(e) => {
              e.preventDefault();
              setShowContact(true);
            }}
          >
            Contacts
          </button>
        </div>
        <div className="h-full pb-96">
          {showContact ? (
            <Contact
              currentId={userCtxId}
              setCurrentChat={setCurrentChat}
              currentChat={currentChat}
            />
          ) : (
            <div className="flex flex-col bg-white shadow-md text-gray-400 h-screen w-60 text-sm overflow-y-auto">
              {!isEmpty(conversations[0]) ? (
                conversations.map((c) => (
                  <div onClick={() => setCurrentChat(c)} key={c.members[1]}>
                    <Conversation conversation={c} currentUser={userData} />
                  </div>
                ))
              ) : (
                <p className="p-2">pas de conversation</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="w-full h-screen overflow-auto relative">
        {currentChat ? (
          <>
            <div className="bg-red-400 h-screen overflow-y-auto pb-28">
              {messages.map((m) => (
                <div
                  ref={scrollRef}
                  key={m.conversationId + m.createdAt}
                  className=""
                >
                  <Message message={m} />
                </div>
              ))}
            </div>
            <div className="w-full flex absolute bottom-14 left-0">
              <input
                type="text"
                className="w-full outline-none p-3"
                placeholder="Ecrivez quelque chose..."
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
              />
              <button
                className="w-48 bg-blue-500 text-white"
                onClick={handleSubmit}
              >
                Envoyer
              </button>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-screen">
            Ouvrez une conversation pour lancer une discussion.
          </div>
        )}
      </div>
    </div>
  );
}

export default Messenger;
