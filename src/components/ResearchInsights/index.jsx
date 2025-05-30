// src/components/ResearchInsights/index.jsx
import React from 'react';
import { Box, Typography, Tabs, Tab, Paper } from '@mui/material';
import PropTypes from 'prop-types';
import Summary from './Summary';
import Visualization from './Visualization';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const ResearchInsights = ({ insights }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className="research-insights">
      <Typography variant="h6" gutterBottom>
        Research Insights
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="insights tabs">
          <Tab label="Summary" {...a11yProps(0)} />
          <Tab label="Visualizations" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Summary summaries={insights.summaries} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Visualization visualizations={insights.visualizations} />
      </TabPanel>
    </Box>
  );
};

export default ResearchInsights;