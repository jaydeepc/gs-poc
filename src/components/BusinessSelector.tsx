import React from 'react';
import Select from 'react-select';
import { BusinessType } from '../types';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

const StyledWrapper = styled('div')`
  margin: 20px 0;
  
  .business-select {
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

const businessTypes: BusinessType[] = [
  { value: 'mortgage', label: 'Mortgage Services' },
  { value: 'investment-banking', label: 'Investment Banking' },
  { value: 'asset-management', label: 'Asset Management' },
  { value: 'retail-banking', label: 'Retail Banking' },
  { value: 'corporate-lending', label: 'Corporate Lending' }
];

interface BusinessSelectorProps {
  onSelect: (business: BusinessType | null) => void;
  value: BusinessType | null;
}

const BusinessSelector: React.FC<BusinessSelectorProps> = ({ onSelect, value }) => {
  return (
    <StyledWrapper>
      <Typography variant="h6" component="h2" gutterBottom>
        Select Business Type
      </Typography>
      <Select
        className="business-select"
        options={businessTypes}
        value={value}
        onChange={onSelect}
        placeholder="Choose a business type..."
        isSearchable
        classNamePrefix="select"
      />
    </StyledWrapper>
  );
};

export default BusinessSelector;
