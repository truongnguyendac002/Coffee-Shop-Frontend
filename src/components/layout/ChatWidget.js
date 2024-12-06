import React, { useState, useEffect, useRef } from "react";
import { MessageOutlined, CloseOutlined } from "@ant-design/icons";
import { Input, Button } from "antd";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import fetchWithAuth from "../../helps/fetchWithAuth";
import summaryApi from "../../common/index";

const ChatWidget = () => {
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [conversation, setConversation] = useState(null);
  const [message, setMessage] = useState("");
  const user = useSelector((state) => state?.user?.user);
  const stompClient = useRef(null);
  console.log("conversation:", conversation);
  useEffect(() => {
    if (!user) {
      setIsChatOpen(false);
    };
  }, [user]);
  useEffect(() => {
    if (!user && isChatOpen) {
      navigate("/login");
    };
  });

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const response = await fetchWithAuth(
          summaryApi.getConversationOfUser.url + user?.id,
          {
            method: summaryApi.getConversationOfUser.method,
          }
        );
        const data = await response.json();
        if (data.respCode === "000") {
          const conversationData = data.data;
          console.log(" data Conversation:", data);
          if (!conversationData) {
            console.log(" error conversationData is null");
          }
          else {
            setConversation(conversationData);
          }
        }
        else {
          console.error("Error fetching conversation list:", data);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }
    if (user && isChatOpen) fetchConversation();

  }, [user, isChatOpen]);

  useEffect(() => {
    if (isChatOpen) {
      const socketFactory = () => new SockJS("http://localhost:8080/ws");
      stompClient.current = Stomp.over(socketFactory);
      stompClient.current.connect(
        {},
        () => {
          console.log("Connected to WebSocket");
          stompClient.current.subscribe(`/topic/conversation/${conversation.id}`, (data) => {
            console.log("Received data:", data.body);
            const response = JSON.parse(data.body);
            if (response.respCode === "000") {
              const conv = response.data;
              stompClient.current.send(`/app/chat/admin`, {}, JSON.stringify(conv));

              console.log("Received conversation:", conv);
              setConversation(conv);
            }
          });
        },
        (error) => console.error("WebSocket connection error:", error)
      );
    }

    return () => {
      if (stompClient.current) {
        stompClient.current.disconnect();
      }
    };
  }, [conversation, isChatOpen, user]);

  const handleSendMessage = () => {
    if (message.trim() && stompClient.current) {
      const chatMessage = {
        senderId: user.id,
        content: message,
        conversationId: conversation.id,
      };
      console.log("Sending message:", chatMessage);
      stompClient.current.send(`/app/chat/${conversation.id}`, {}, JSON.stringify(chatMessage));

      setMessage("");
    }
  };


  return (
    <div className="fixed bottom-10 right-10 z-10">
      {(!isChatOpen) && (
        <div
          className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center cursor-pointer shadow-lg"
          onClick={() => setIsChatOpen(true)}
        >
          <MessageOutlined style={{ fontSize: "24px" }} />
        </div>
      )}
      {(isChatOpen && user) && (
        <div className="bg-white shadow-lg rounded-lg p-4 w-80">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Chat with Admin</h3>
            <CloseOutlined
              className="cursor-pointer"
              onClick={() => setIsChatOpen(false)}
            />
          </div>
          <div className="mb-4 h-40 bg-gray-100 rounded p-2 overflow-y-auto">
            {conversation?.messageList?.map((msg) => (
              <p key={msg?.id} className="text-sm">
                {msg.senderId === user.id
                  ? (<>
                    <strong className="text-blue-600">You:</strong> {msg.content}
                  </>)
                  : (
                    <>
                      <strong className="text-red-600">Admin:</strong> {msg.content}

                    </>
                  )
                }
              </p>
            ))}
          </div>
          <Input.TextArea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={2}
            placeholder="Enter your message"
            className="mb-2"
          />
          <Button type="primary" className="w-full" onClick={handleSendMessage}>
            Send
          </Button>
        </div>
      )}
    </div>
  );
};


export default ChatWidget;
