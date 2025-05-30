// src/components/DocumentUpload/index.jsx
import React, { useState } from 'react';
import { Button, Box, Typography, LinearProgress, Chip } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import useApi from '../../hooks/useApi';

const DocumentUpload = ({ setIsProcessing, setResearchContext }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const api = useApi();

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    setIsUploading(true);
    setIsProcessing(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      selectedFiles.forEach(file => {
        formData.append('documents', file);
      });

      const response = await api.uploadDocuments(formData, (progressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadProgress(progress);
      });

      setResearchContext(prev => ({
        ...prev,
        sources: [...prev.sources, ...response.sources],
        keyConcepts: [...prev.keyConcepts, ...response.keyConcepts]
      }));
    } catch (error) {
      console.error('Error uploading documents:', error);
    } finally {
      setIsUploading(false);
      setIsProcessing(false);
      setUploadProgress(0);
      setSelectedFiles([]);
    }
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Box className="document-upload">
      <input
        accept=".pdf,.txt,.doc,.docx"
        style={{ display: 'none' }}
        id="document-upload-input"
        type="file"
        multiple
        onChange={handleFileChange}
      />
      <label htmlFor="document-upload-input">
        <Button
          variant="outlined"
          component="span"
          startIcon={<CloudUploadIcon />}
          fullWidth
          disabled={isUploading}
        >
          Upload Research Documents
        </Button>
      </label>
      
      {selectedFiles.length > 0 && (
        <Box mt={2}>
          <Typography variant="subtitle2" gutterBottom>
            Selected files:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {selectedFiles.map((file, index) => (
              <Chip
                key={index}
                label={file.name}
                onDelete={() => removeFile(index)}
                disabled={isUploading}
              />
            ))}
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            disabled={isUploading}
            fullWidth
            sx={{ mt: 2 }}
          >
            Process Documents
          </Button>
        </Box>
      )}
      
      {isUploading && (
        <Box mt={2}>
          <Typography variant="caption" display="block" gutterBottom>
            Processing documents...
          </Typography>
          <LinearProgress variant="determinate" value={uploadProgress} />
        </Box>
      )}
    </Box>
  );
};

export default DocumentUpload;