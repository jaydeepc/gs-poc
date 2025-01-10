import React from 'react';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Paper, Typography, Button } from '@mui/material';
import { BusinessType, Region } from '../types';
import BusinessSelector from './BusinessSelector';
import RegionSelector from './RegionSelector';
import { Analytics, ArrowForward } from '@mui/icons-material';

const FormContainer = styled(Paper)`
  padding: 32px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const FormHeader = styled('div')`
  text-align: center;
  margin-bottom: 40px;
`;

const Logo = styled('div')`
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
  background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 32px rgba(25, 118, 210, 0.3);
  
  .MuiSvgIcon-root {
    font-size: 40px;
    color: white;
  }
`;

const AnalyzeButton = styled(Button)`
  margin-top: 40px;
  background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
  padding: 12px 32px;
  border-radius: 12px;
  text-transform: none;
  font-size: 1.1rem;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);
  
  &:hover {
    background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(25, 118, 210, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  .MuiButton-endIcon {
    margin-left: 12px;
    
    .MuiSvgIcon-root {
      font-size: 20px;
    }
  }
  
  &.Mui-disabled {
    background: #e0e0e0;
    box-shadow: none;
  }
`;

interface SelectionFormProps {
  selectedBusiness: BusinessType | null;
  selectedRegion: Region | null;
  onBusinessSelect: (business: BusinessType | null) => void;
  onRegionSelect: (region: Region | null) => void;
  onAnalyze: () => void;
  isLoading: boolean;
  error?: string | null;
}

const SelectionForm: React.FC<SelectionFormProps> = ({
  selectedBusiness,
  selectedRegion,
  onBusinessSelect,
  onRegionSelect,
  onAnalyze,
  isLoading,
  error
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <FormContainer elevation={0}>
        <FormHeader>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <Logo>
              <Analytics />
            </Logo>
          </motion.div>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
            Get Started
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Select your business type and region to analyze potential risks
          </Typography>
        </FormHeader>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <BusinessSelector
            value={selectedBusiness}
            onSelect={onBusinessSelect}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <RegionSelector
            value={selectedRegion}
            onSelect={onRegionSelect}
          />
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Typography 
              color="error" 
              sx={{ 
                textAlign: 'center', 
                marginBottom: 2,
                padding: '8px 16px',
                background: 'rgba(211, 47, 47, 0.1)',
                borderRadius: '8px',
                border: '1px solid rgba(211, 47, 47, 0.2)'
              }}
            >
              {error}
            </Typography>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <AnalyzeButton
            variant="contained"
            fullWidth
            onClick={onAnalyze}
            disabled={!selectedBusiness || !selectedRegion || isLoading}
            endIcon={<ArrowForward />}
          >
            {isLoading ? 'Analyzing...' : 'Generate Risk Analysis'}
          </AnalyzeButton>
        </motion.div>
      </FormContainer>
    </motion.div>
  );
};

export default SelectionForm;
