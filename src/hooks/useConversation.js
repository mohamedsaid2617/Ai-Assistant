// src/hooks/useConversation.js
import { useState, useEffect } from 'react';

const useConversation = (initialConversation = []) => {
  const [conversation, setConversation] = useState(initialConversation);
  const [hasNewMessage, setHasNewMessage] = useState(false);

  useEffect(() => {
    if (conversation.length > 0) {
      setHasNewMessage(true);
      const timer = setTimeout(() => setHasNewMessage(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [conversation]);

  const addMessage = (message) => {
    setConversation(prev => [...prev, message]);
  };

  const clearConversation = () => {
    setConversation([]);
  };

  return {
    conversation,
    addMessage,
    clearConversation,
    hasNewMessage,
  };
};

export default useConversation;