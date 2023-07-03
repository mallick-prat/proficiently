import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Message from "../components/Demo/messages.jsx";
import { Configuration, OpenAIApi } from "openai";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

let inactivityTimer: NodeJS.Timeout | number | undefined;

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default function DemoPage() {
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
  const [listening, setListening] = useState(false);
  const [lastTranscriptTime, setLastTranscriptTime] = useState(0);

  const { transcript, listening: srListening, resetTranscript } = useSpeechRecognition(); // get resetTranscript from useSpeechRecognition

  useEffect(() => {
    if (srListening) {
      setMessageText(transcript);
    }
  }, [transcript, srListening]);

  useEffect(() => {
    if (!srListening && listening) {
      resetTranscript();
    }
  }, [srListening, listening, resetTranscript]);

  const handleMicClick = () => {
    if (!listening) {
      SpeechRecognition.startListening({ continuous: true });
      setListening(true);
    } else {
      SpeechRecognition.stopListening();
      setListening(false);
    }
  };

  useEffect(() => {
    if (srListening) {
      setMessageText(transcript);
      setLastTranscriptTime(Date.now());
    } else {
      const elapsedTime = Date.now() - lastTranscriptTime;
      if (elapsedTime >= 1500 && listening) {
        SpeechRecognition.stopListening();
        setListening(false);
        handleMessageSend(); // call the send message function
      }
    }
  }, [transcript, srListening, lastTranscriptTime, listening]);

  useEffect(() => {
    if (messageText.trim() !== "") {
      inactivityTimer = setInterval(() => {
        const elapsedTime = Date.now() - lastTranscriptTime;
        if (elapsedTime >= 1500 && listening) {
          SpeechRecognition.stopListening();
          setListening(false);
          clearInterval(inactivityTimer);
          handleMessageSend();
        }
      }, 1000);
    }

    return () => clearInterval(inactivityTimer);
  }, [lastTranscriptTime, listening, messageText]);

  const handleMessageSend = async () => {
    if (messageText.trim() !== "") {
      // Add the user's message to the chat history
      setMessages((messages) => [...messages, { text: messageText, sender: "user" }]);
      setMessageText("");
      try {
        const completion = await openai.createChatCompletion({
          model: "gpt-3.5-turbo-16k",
          messages: [
            {
              role: "system",
              content:
                "",
            },
            { role: "user", content: messageText },
          ],
        });

        // If there is a bot response, add it to the chat history
        if (completion.data && completion.data.choices && completion.data.choices.length > 0) {
          const botResponse = completion.data.choices[0]?.message?.content?.trim();
          if (botResponse) {
            setMessages((messages) => [...messages, { text: botResponse, sender: "other" }]);
          }
        }
      } catch (err) {
        console.error("Error while sending message to GPT-3.5-turbo:", err);
      }
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black">
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-md w-11/12 h-full mt-4 bg-white md:flex md:flex-row"
      >
        <div className="w-full md:w-2/3 border-b md:border-b-0 md:border-r-2 flex flex-col">
          <div className="flex items-center min-h-[4.5rem] px-8 py-3 border-b border-n-3">
            <div className="text-xl font-bold flex-grow-0">[DEMO - BETA] 👚 Unicloth - Interviewer Led</div>
            <div className="flex-grow"></div>
            <svg
              className="inline-block w-6 h-6 fill-n-4 transition-colors group-hover:fill-primary-1"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M17.138 10c.795 0 1.386-.001 1.898.136a4 4 0 0 1 2.828 2.828c.12.448.135.956.136 1.609v1.668l-.044 2.011c-.046.562-.145 1.079-.392 1.564a4 4 0 0 1-1.748 1.748c-.485.247-1.002.346-1.564.392-.541.044-1.206.044-2.011.044H7.759c-.805 0-1.469 0-2.011-.044-.562-.046-1.079-.145-1.564-.392a4 4 0 0 1-1.748-1.748c-.247-.485-.346-1.002-.392-1.564A21.98 21.98 0 0 1 2 16.578v-1.715c0-.795-.001-1.386.136-1.898a4 4 0 0 1 2.828-2.828C5.476 9.999 6.067 10 6.863 10H7a1 1 0 1 1 0 2l-.362.001c-.711.003-.963.016-1.155.068a2 2 0 0 0-1.414 1.414c-.052.193-.065.444-.068 1.155v2.094l.037 1.357c.036.438.101.663.18.819a2 2 0 0 0 .874.874c.156.08.381.145.819.18.4.033.905.037 1.613.038H16.2l1.889-.038c.438-.036.663-.101.819-.18a2 2 0 0 0 .874-.874c.08-.156.145-.381.18-.819.033-.4.037-.905.038-1.613V15l-.068-1.518a2 2 0 0 0-1.414-1.414c-.193-.052-.444-.065-1.155-.068L17 12h0a1 1 0 1 1 0-2h.138zm-4.43-7.707l4 4a1 1 0 0 1-1.414 1.414L13 5.414V15a1 1 0 1 1-2 0V5.414L8.707 7.707a1 1 0 1 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0z"></path>
            </svg>
          </div>

          <div className="flex-grow md:h-full relative overflow-y-auto">
          <div className="flex flex-col mb-4 gap-4 py-4 m-4">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.1, delay: index * 0.1 }}
              >
                <Message text={message.text} sender={message.sender} />
              </motion.div>
            ))}
          </div>
        </div>

          <div className="bg-white border shadow-lg">
            <div className="rounded-lg flex-none mx-8 flex items-center">
              {/* off state
                 - handle on state,
                 - transcription,
                 - enter off state,
                 - 
                */}
              <motion.svg
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke={listening ? "red" : "currentColor"}
                className="w-6 h-6"
                onClick={handleMicClick}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
                />
              </motion.svg>
              <textarea
                className="w-full h-16 rounded placeholder-gray-500 text-gray-900 overflow-y-auto resize-none flex-grow ml-4 mr-4 mt-6 focus:outline-none placeholder-center p-2"
                placeholder="Type your message here..."
                name="message"
                value={messageText} // Bind the textarea value to the state
                onChange={(e) => setMessageText(e.target.value)} // Update the state when the textarea value changes
              ></textarea>

              <motion.svg
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
                onClick={handleMessageSend} // Call the handler when the SVG is clicked
                style={{ cursor: "pointer" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </motion.svg>
            </div>
          </div>
        </div>
        <div className="hidden md:block w-full md:w-1/3">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center min-h-[4.5rem] px-12 py-3 border-b border-n-3"
          >
            <h1 className="text-center">Notes</h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="p-4 mt-4 bg-white rounded-lg"
          >
            <motion.textarea
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full h-120 p-4 placeholder-gray-500 text-gray-900 resize-vertical border rounded focus:outline-none"
              placeholder="Write your notes here..."
              // Add any necessary event handlers or state management
            ></motion.textarea>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
