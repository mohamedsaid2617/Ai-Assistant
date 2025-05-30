// src/hooks/useApi.js
import { useState } from 'react';

const useApi = () => {
  const [error, setError] = useState(null);

  const sendMessage = async (data) => {
    try {
      // In a real implementation, this would call your backend API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      
      return await response.json();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const uploadDocuments = async (formData, onUploadProgress) => {
    try {
      // In a real implementation, this would call your backend API
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to upload documents');
      }
      
      return await response.json();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    error,
    sendMessage,
    uploadDocuments,
  };
};

export default useApi;