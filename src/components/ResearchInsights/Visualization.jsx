// src/components/ResearchInsights/Visualization.jsx
import React from 'react';
import { Box, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Visualization = ({ visualizations }) => {
  const [selectedViz, setSelectedViz] = React.useState(0);

  const handleChange = (event) => {
    setSelectedViz(event.target.value);
  };

  return (
    <Box className="visualization-container">
      {visualizations.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No visualizations generated yet. Ask for data analysis to see visualizations.
        </Typography>
      ) : (
        <>
          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel id="viz-select-label">Visualization</InputLabel>
            <Select
              labelId="viz-select-label"
              value={selectedViz}
              label="Visualization"
              onChange={handleChange}
            >
              {visualizations.map((viz, index) => (
                <MenuItem key={index} value={index}>
                  {viz.title || `Visualization ${index + 1}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={visualizations[selectedViz]?.data || []}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
          
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            {visualizations[selectedViz]?.description || ''}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default Visualization;