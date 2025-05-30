// src/components/ChatInterface/ChatInput.jsx
import React from 'react';
import { TextField, InputAdornment, IconButton, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const ChatInput = ({ inputMessage, setInputMessage, handleSendMessage, isProcessing }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box className="chat-input-container">
      <TextField
        fullWidth
        multiline
        maxRows={4}
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Ask a research question or upload a document..."
        disabled={isProcessing}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton edge="start" disabled={isProcessing}>
                <AttachFileIcon />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton 
                edge="end" 
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isProcessing}
              >
                <SendIcon color={!inputMessage.trim() || isProcessing ? "disabled" : "primary"} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default ChatInput;