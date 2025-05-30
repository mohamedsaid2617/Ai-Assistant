// src/components/ChatInterface/Message.jsx
import React from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Chip, Box } from '@mui/material';
import { blue, green } from '@mui/material/colors';
import ArticleIcon from '@mui/icons-material/Article';
import PersonIcon from '@mui/icons-material/Person';

const Message = ({ message }) => {
  return (
    <ListItem alignItems="flex-start" className={`message ${message.sender}`}>
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: message.sender === 'user' ? green[500] : blue[500] }}>
          {message.sender === 'user' ? <PersonIcon /> : <ArticleIcon />}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography variant="subtitle2" color="text.primary">
            {message.sender === 'user' ? 'You' : 'SynthesisTalk'}
          </Typography>
        }
        secondary={
          <>
            <Typography
              component="span"
              variant="body2"
              color={message.isError ? "error" : "text.primary"}
              className="message-content"
            >
              {message.content}
            </Typography>
            {message.sources && message.sources.length > 0 && (
              <Box mt={1}>
                <Typography variant="caption" color="text.secondary">
                  Sources:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                  {message.sources.map((source, index) => (
                    <Chip 
                      key={index}
                      label={source.type === 'web' ? 'Web Search' : source.name || 'Document'}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Box>
            )}
          </>
        }
      />
    </ListItem>
  );
};

export default Message;