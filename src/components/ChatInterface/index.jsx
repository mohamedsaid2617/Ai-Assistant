// src/components/ChatInterface/index.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Box, List, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Message from './Message';
import ChatInput from './ChatInput';
import useApi from '../../hooks/useApi';

const ChatInterface = ({ 
  conversation, 
  setConversation, 
  setIsProcessing,
  setResearchContext,
  setInsights
}) => {
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  const api = useApi();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    };

    setConversation(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsProcessing(true);

    try {
      const response = await api.sendMessage({
        message: inputMessage,
        context: conversation
      });

      const assistantMessage = {
        id: Date.now() + 1,
        sender: 'assistant',
        content: response.content,
        sources: response.sources,
        timestamp: new Date().toISOString()
      };

      setConversation(prev => [...prev, assistantMessage]);
      
      if (response.context) {
        setResearchContext(response.context);
      }
      
      if (response.insights) {
        setInsights(response.insights);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        sender: 'assistant',
        content: 'Sorry, I encountered an error processing your request.',
        isError: true,
        timestamp: new Date().toISOString()
      };
      setConversation(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Box className="chat-interface">
      <List className="message-list">
        {conversation.map((msg) => (
          <Message key={msg.id} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </List>
      <ChatInput
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        handleSendMessage={handleSendMessage}
        isProcessing={isProcessing}
      />
    </Box>
  );
};

export default ChatInterface;