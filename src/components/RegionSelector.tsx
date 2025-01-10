import React from 'react';
import Select from 'react-select';
import { Region } from '../types';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

const StyledWrapper = styled('div')`
  margin-bottom: 20px;
  
  .region-select {
    margin-top: 8px;
    
    .select__control {
      background: rgba(255, 255, 255, 0.9);
      border-radius: 12px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      padding: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      transition: all 0.2s ease;
      
      &:hover {
        border-color: #1976d2;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      
      &--is-focused {
        border-color: #1976d2;
        box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2);
      }
    }
    
    .select__placeholder {
      color: rgba(0, 0, 0, 0.4);
    }
    
    .select__single-value {
      color: rgba(0, 0, 0, 0.8);
      font-weight: 500;
    }
    
    .select__menu {
      background: white;
      border-radius: 12px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      overflow: hidden;
      
      .select__menu-list {
        padding: 6px;
      }
    }
    
    .select__option {
      border-radius: 8px;
      margin: 2px 0;
      padding: 10px 12px;
      font-weight: 500;
      transition: all 0.2s ease;
      
      &--is-focused {
        background-color: rgba(25, 118, 210, 0.08);
        color: #1976d2;
      }
      
      &--is-selected {
        background-color: #1976d2;
        color: white;
      }
    }
    
    .select__indicator-separator {
      display: none;
    }
    
    .select__dropdown-indicator {
      color: rgba(0, 0, 0, 0.3);
      
      &:hover {
        color: #1976d2;
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
      <Typography 
        variant="subtitle1" 
        sx={{ 
          fontWeight: 600,
          color: 'rgba(0, 0, 0, 0.7)',
          mb: 1
        }}
      >
        Region
      </Typography>
      <Select
        className="region-select"
        options={regions}
        value={value}
        onChange={onSelect}
        placeholder="Select a region..."
        isSearchable
        classNamePrefix="select"
      />
    </StyledWrapper>
  );
};

export default RegionSelector;
