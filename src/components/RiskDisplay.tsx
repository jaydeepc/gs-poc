import React from 'react';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Container, Typography, CircularProgress } from '@mui/material';
import RiskCard from './RiskCard';
import { RiskAnalysis } from '../types';

const StyledContainer = styled(Container)`
  padding: 24px;
`;

const LoadingWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  gap: 16px;
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

interface RiskDisplayProps {
  analysis: RiskAnalysis | null;
  isLoading: boolean;
  error: string | null;
}

const RiskDisplay: React.FC<RiskDisplayProps> = ({ analysis, isLoading, error }) => {
  if (isLoading) {
    return (
      <LoadingWrapper>
        <CircularProgress size={40} />
        <Typography variant="h6" color="textSecondary">
          Analyzing risks...
        </Typography>
      </LoadingWrapper>
    );
  }

  if (error) {
    return (
      <LoadingWrapper>
        <Typography variant="h6" color="error" gutterBottom>
          Error Occurred
        </Typography>
        <Typography variant="body1" color="error" style={{ textAlign: 'center', maxWidth: '600px' }}>
          {error}
        </Typography>
        <Typography variant="body2" color="textSecondary" style={{ marginTop: '16px', textAlign: 'center' }}>
          Please check the browser console for more details or try again.
        </Typography>
      </LoadingWrapper>
    );
  }

  if (!analysis || analysis.risks.length === 0) {
    return (
      <LoadingWrapper>
        <Typography variant="h6" color="textSecondary">
          Select a business type and region to begin analysis
        </Typography>
      </LoadingWrapper>
    );
  }

  return (
    <StyledContainer>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {analysis.risks.map((risk, index) => (
          <RiskCard key={index} risk={risk} index={index} />
        ))}
      </motion.div>
    </StyledContainer>
  );
};

export default RiskDisplay;
