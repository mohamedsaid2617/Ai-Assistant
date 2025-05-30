// src/components/ResearchInsights/Summary.jsx
import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Summary = ({ summaries }) => {
  return (
    <Box className="summaries-container">
      {summaries.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No summaries generated yet. Start a research conversation to see insights.
        </Typography>
      ) : (
        summaries.map((summary, index) => (
          <Accordion key={index} defaultExpanded={index === 0}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`summary-${index}-content`}
              id={`summary-${index}-header`}
            >
              <Typography variant="subtitle2">
                {summary.title || `Summary ${index + 1}`}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {summary.format === 'bullet' ? (
                <ul>
                  {summary.content.split('\n').map((point, i) => (
                    <li key={i}>
                      <Typography variant="body2">{point}</Typography>
                    </li>
                  ))}
                </ul>
              ) : (
                <Typography variant="body2" style={{ whiteSpace: 'pre-line' }}>
                  {summary.content}
                </Typography>
              )}
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </Box>
  );
};

export default Summary;