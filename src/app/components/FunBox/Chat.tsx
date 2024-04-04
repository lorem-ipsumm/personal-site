"use client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Send } from "react-feather";
import { PuffLoader } from "react-spinners";
import { set } from "zod";

interface MESSAGE {
  likes: number;
  message: string;
  timestamp: number;
  uid?: string;
  username: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<MESSAGE[]>([]);
  const [input, setInput] = useState<string>("");
  const [pending, setPending] = useState<boolean>(false);
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [uid, setUid] = useState<string | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    generateUid();
  }, []);

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }

  const generateUid = () => {
    // check local storage for uid
    let uid = localStorage.getItem("chatUid");
    // if no uid exists, generate one
    if (!uid) {
      uid = Math.random().toString(36).substring(2, 15);
      // save uid to local storage
      localStorage.setItem("chatUid", uid);
    }
    setUid(uid);
    loadRoomData(uid);
    loadMessages();
  }

  // send message to database
  const sendMessage = () => {
    if (!username) return;

    setPending(true);

    const messageText = input;

    const messageData = {
      message: messageText,
      uid: uid,
      id: "30f5075a",
    };

    setInput("");

    const url = `https://us-central1-qr-code-app-19379.cloudfunctions.net/sendMessage`;

    // send request to backend
    axios({
      method: "post",
      url: url,
      params: messageData,
      headers: { "Content-Type": "application/json" },
    })
      .then(function (response) {
        const newMessage: MESSAGE = {
          message: messageText,
          username: username,
          likes: 0,
          timestamp: new Date().getTime(),
        };
        setMessages([...(messages || []), newMessage]);
        setPending(false);
        setTimeout(() => {
          scrollToBottom();
        }, 500);
      })
      .catch(function (error) {
        console.log("message failed to send");
        console.log(error);
        setPending(false);
      });
  };

  const loadMessages = async () => {
    try {
      // build request
      const url = `https://us-central1-qr-code-app-19379.cloudfunctions.net/loadMessages`;
      const requestData = {
        id: "30f5075a",
        lastMessageCount: 50,
      };
      // send load messages request to backend
      axios({
        method: "get",
        url: url,
        params: requestData,
      })
        .then(function (response) {
          // update state var
          setMessages(response.data.messages);
          scrollToBottom();
        })
        .catch(function (error) {
          console.log(error);

      })
    } catch (e) {
      console.log(e);
    }
  };

  const loadRoomData = (uid: string) => {

    const url = `https://us-central1-qr-code-app-19379.cloudfunctions.net/loadRoomData`;

    const signupData = {
      id: "30f5075a",
      uid,
    };

    // send signup request to backend
    axios({
      method: "get",
      url: url,
      params: signupData,
      // headers: { "Content-Type": "application/json"}
    })
      .then(function (response) {
        // update state var
        setUsername(response.data.username);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const renderMessage = (message: MESSAGE, index: number) => {

    // format the date to be more readable
    const formattedDate = new Date(message.timestamp).toLocaleDateString(
      "en-US",
      {
        hour: "numeric",
        minute: "numeric",
        month: "short",
        day: "numeric",
        year: "numeric",
      },
    );

    return (
      <div 
        className="max-w-full text-wrap flex flex-col"
        key={index}
      >
        <span className="font-bold text-blue-500">{message.username}</span>
        <span className="text-xs opacity-40 mb-1">{formattedDate}</span>
        <span>{message.message}</span>
      </div>
    );
  };

  const renderMesssages = () => {
    return (
      <div 
        className="flex flex-col gap-3 overflow-y-auto pb-3 overflow-x-hidden"
        ref={containerRef}
      >
        {messages.map((message: MESSAGE, index: number) =>
          renderMessage(message, index),
        )}
      </div>
    );
  };

  const keyPressed = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    // if the user presses enter, send the message
    if (e.key === "Enter") {
      sendMessage();
    }
  }

  const renderInput = () => {
    return (
      <div className="border-1 relative flex min-h-10 w-full items-center rounded-lg bg-zinc-900 px-2">
        <input
          type="text"
          className="h-full w-full bg-transparent outline-none"
          placeholder="Leave a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={keyPressed}
        />
        <div
          className="absolute right-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg bg-zinc-900 transition-all hover:bg-zinc-800"
          onClick={sendMessage}
        >
          {pending ? (
            <PuffLoader color="#fff" size={20} />
          ) : (
            <Send className="stroke-blue-500" size={15} />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-full w-full flex-col justify-between gap-1">
      {renderMesssages()}
      {renderInput()}
    </div>
  );
};

export default Chat;
