import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { cn } from "../../lib/utils";
import { MessageSquareText, X, SendHorizonal } from "lucide-react";
import CryptoJS from 'crypto-js';


// Avatar colors for uniqueness
const avatarColors = [
  "bg-red-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-teal-500",
];

const getColorForUser = (id) => {
  const index = Math.abs(id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0)) % avatarColors.length;
  return avatarColors[index];
};

const getInitials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

const Message = ({ darkMode, yChatArray, username = 'Anonymous', userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const messagesRef = useRef(null);

   useEffect(() => {
    if (!yChatArray) return;

    const handleUpdate = (event) => {
      const addedMessages = [];
      event.changes.added.forEach((item) => {
        const content = item.content.getContent();
        addedMessages.push(...content);
      });
      if (addedMessages.length > 0) {
        setMessages((prev) => [...prev, ...addedMessages]);
      }
    };

    yChatArray.observe(handleUpdate);
    setMessages(yChatArray.toArray());

    return () => {
      yChatArray.unobserve(handleUpdate);
    };
  }, [yChatArray]);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSendMessage = () => {
    const trimmed = messageInput.trim();
    if (!trimmed || !yChatArray) return;

    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    yChatArray.push([
      {
        sender: username,
        senderId: userId,
        timestamp,
        content: encryptMessage(trimmed),
      },
    ]);

    setMessageInput("");
  };

  const secretKey = process.env.REACT_APP_MESSAGE_SECRET_KEY;
  const encryptMessage = (data) => {
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    return ciphertext;
  };

  const decryptMessage = (ciphertext) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  };

  return (
    <>
      {/* Floating toggle button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(prev => !prev)}
          className="rounded-full px-3 py-5 shadow-lg"
          title = "Chat"
          variant="default"
        >
          <MessageSquareText className="w-5 h-5" />
        </Button>
      </div>

      {/* Chat popup */}
      <div
        className={cn(
          "fixed bottom-20 right-6 w-[360px] max-h-[600px] bg-white dark:bg-zinc-900 rounded-xl border border-border shadow-xl z-50 flex flex-col transition-all duration-300",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 pointer-events-none translate-y-4"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b dark:border-zinc-700">
          <h2 className="font-semibold text-lg text-gray-800 dark:text-white">
            Chat
          </h2>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={messagesRef}>
          {messages.map((msg, index) => {
            const isMe = msg.senderId === userId;
            const avatarColor = getColorForUser(msg.senderId || "default");
            return (
              <div
                key={index}
                className={cn("flex items-start space-x-2", isMe ? "justify-end" : "justify-start")}
              >
                {!isMe && (
                  <div
                    className={cn(
                      "w-8 h-8 p-4 rounded-full flex items-center justify-center text-white text-sm font-semibold",
                      avatarColor
                    )}
                  >
                    {getInitials(msg.sender)}
                  </div>
                )}
                <div className='flex flex-col'>
                  <div className={cn(isMe ? "flex justify-end" : "flex justify-start")}>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      {msg.sender} • {msg.timestamp}
                    </div>
                  </div>
                  <div className={cn(isMe ? "flex justify-end" : "flex justify-start")}>
                    <div
                      className={cn(
                        "px-3 py-2 rounded-lg max-w-[85%] text-sm break-words",
                        isMe
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white"
                      )}
                    >
                      {decryptMessage(msg.content)}
                    </div>
                  </div>
                </div>
                {isMe && (
                  <div
                    className={cn(
                      "w-8 h-8 p-4 rounded-full flex items-center justify-center text-white text-sm font-semibold",
                      avatarColor
                    )}
                  >
                    {getInitials(msg.sender)}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Input */}
        <div className="flex items-center border-t px-4 py-3 bg-gray-100 dark:bg-zinc-800 dark:border-zinc-700">
          <Textarea
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type a message"
            className="flex-1 mr-2 max-h-14 min-h-10 overflow-y-auto"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
          />
          <Button title="Send" onClick={handleSendMessage} size="sm">
            < SendHorizonal className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Message;
