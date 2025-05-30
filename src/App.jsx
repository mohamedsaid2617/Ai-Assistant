// src/App.jsx
import React, { useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline, Container, Grid, Paper } from '@mui/material';
import { theme } from './styles/theme';
import ChatInterface from './components/ChatInterface';
import DocumentUpload from './components/DocumentUpload';
import ResearchInsights from './components/ResearchInsights';
import ContextPanel from './components/ContextPanel';
import StatusIndicator from './components/StatusIndicator';
import './styles/main.css';

function App() {
  const [conversation, setConversation] = useState([]);
  const [researchContext, setResearchContext] = useState({
    topic: '',
    sources: [],
    keyConcepts: []
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [insights, setInsights] = useState({
    summaries: [],
    visualizations: []
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl" className="app-container">
        <Grid container spacing={3}>
          {/* Left Sidebar - Context Panel */}
          <Grid item xs={12} md={3}>
            <Paper elevation={3} className="panel">
              <ContextPanel 
                context={researchContext} 
                setContext={setResearchContext}
              />
            </Paper>
          </Grid>
          
          {/* Main Chat Area */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} className="panel chat-panel">
              <StatusIndicator isProcessing={isProcessing} />
              <ChatInterface 
                conversation={conversation}
                setConversation={setConversation}
                setIsProcessing={setIsProcessing}
                setResearchContext={setResearchContext}
                setInsights={setInsights}
              />
              <DocumentUpload 
                setIsProcessing={setIsProcessing}
                setResearchContext={setResearchContext}
              />
            </Paper>
          </Grid>
          
          {/* Right Sidebar - Research Insights */}
          <Grid item xs={12} md={3}>
            <Paper elevation={3} className="panel">
              <ResearchInsights insights={insights} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;