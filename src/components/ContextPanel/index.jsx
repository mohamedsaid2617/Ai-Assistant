// src/components/ContextPanel/index.jsx
import React from 'react';
import { Box, Typography, Chip, Divider, TextField, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

const ContextPanel = ({ context, setContext }) => {
  const [isEditingTopic, setIsEditingTopic] = useState(false);
  const [editedTopic, setEditedTopic] = useState(context.topic);

  const handleSaveTopic = () => {
    setContext(prev => ({ ...prev, topic: editedTopic }));
    setIsEditingTopic(false);
  };

  const handleCancelEdit = () => {
    setEditedTopic(context.topic);
    setIsEditingTopic(false);
  };

  return (
    <Box className="context-panel">
      <Typography variant="h6" gutterBottom>
        Research Context
      </Typography>
      
      <Divider sx={{ my: 2 }} />
      
      <Box mb={3}>
        {isEditingTopic ? (
          <Box>
            <TextField
              fullWidth
              value={editedTopic}
              onChange={(e) => setEditedTopic(e.target.value)}
              label="Research Topic"
              variant="outlined"
              size="small"
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
              <Button
                size="small"
                startIcon={<SaveIcon />}
                onClick={handleSaveTopic}
                sx={{ mr: 1 }}
              >
                Save
              </Button>
              <Button
                size="small"
                startIcon={<CancelIcon />}
                onClick={handleCancelEdit}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
              {context.topic || 'No topic set'}
            </Typography>
            <IconButton size="small" onClick={() => setIsEditingTopic(true)}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
      </Box>
      
      <Typography variant="subtitle2" gutterBottom>
        Sources:
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
        {context.sources.length === 0 ? (
          <Typography variant="caption" color="text.secondary">
            No sources added yet
          </Typography>
        ) : (
          context.sources.map((source, index) => (
            <Chip
              key={index}
              label={source.type === 'web' ? 'Web Search' : source.name || 'Document'}
              size="small"
              variant="outlined"
            />
          ))
        )}
      </Box>
      
      <Typography variant="subtitle2" gutterBottom>
        Key Concepts:
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {context.keyConcepts.length === 0 ? (
          <Typography variant="caption" color="text.secondary">
            No concepts identified yet
          </Typography>
        ) : (
          context.keyConcepts.map((concept, index) => (
            <Chip
              key={index}
              label={concept}
              size="small"
              color="primary"
            />
          ))
        )}
      </Box>
    </Box>
  );
};

export default ContextPanel;