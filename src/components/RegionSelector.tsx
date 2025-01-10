import React from 'react';
import Select from 'react-select';
import { Region } from '../types';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

const StyledWrapper = styled('div')`
  margin: 20px 0;
  
  .region-select {
    margin-top: 10px;
    
    .select__control {
      border-radius: 8px;
      border: 2px solid #e0e0e0;
      transition: all 0.3s ease;
      
      &:hover {
        border-color: #1976d2;
      }
      
      &--is-focused {
        border-color: #1976d2;
        box-shadow: 0 0 0 1px #1976d2;
      }
    }
    
    .select__option {
      &--is-focused {
        background-color: rgba(25, 118, 210, 0.1);
      }
      
      &--is-selected {
        background-color: #1976d2;
      }
    }
  }
`;

const regions: Region[] = [
  { value: 'north-america', label: 'North America' },
  { value: 'europe', label: 'Europe' },
  { value: 'asia-pacific', label: 'Asia Pacific' },
  { value: 'latin-america', label: 'Latin America' },
  { value: 'middle-east', label: 'Middle East' },
  { value: 'africa', label: 'Africa' }
];

interface RegionSelectorProps {
  onSelect: (region: Region | null) => void;
  value: Region | null;
}

const RegionSelector: React.FC<RegionSelectorProps> = ({ onSelect, value }) => {
  return (
    <StyledWrapper>
      <Typography variant="h6" component="h2" gutterBottom>
        Select Region
      </Typography>
      <Select
        className="region-select"
        options={regions}
        value={value}
        onChange={onSelect}
        placeholder="Choose a region..."
        isSearchable
        classNamePrefix="select"
      />
    </StyledWrapper>
  );
};

export default RegionSelector;
