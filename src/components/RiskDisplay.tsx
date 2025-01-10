import React from 'react';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Container, Typography, CircularProgress, Button } from '@mui/material';
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
  min-height: 300px;
  gap: 24px;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const LoadingSpinner = styled(CircularProgress)`
  &.MuiCircularProgress-root {
    color: #1976d2;
    filter: drop-shadow(0 0 8px rgba(25, 118, 210, 0.3));
  }
`;

const LoadingText = styled(Typography)`
  background: linear-gradient(90deg, #1976d2, #64b5f6, #1976d2);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 2s linear infinite;
  
  @keyframes shine {
    to {
      background-position: 200% center;
    }
  }
`;

const ErrorWrapper = styled(LoadingWrapper)`
  background: linear-gradient(145deg, rgba(255, 235, 238, 0.9) 0%, rgba(255, 205, 210, 0.7) 100%);
  border-color: rgba(239, 154, 154, 0.5);
`;

const EmptyStateWrapper = styled(LoadingWrapper)`
  background: linear-gradient(145deg, rgba(232, 245, 233, 0.9) 0%, rgba(200, 230, 201, 0.7) 100%);
  border-color: rgba(165, 214, 167, 0.5);
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
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <LoadingSpinner size={60} thickness={4} />
        </motion.div>
        <LoadingText variant="h5" gutterBottom>
          Analyzing Risks
        </LoadingText>
        <Typography variant="body1" color="text.secondary" align="center">
          Generating comprehensive risk analysis for your business...
        </Typography>
      </LoadingWrapper>
    );
  }

  if (error) {
    return (
      <ErrorWrapper>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <Typography variant="h5" color="error" gutterBottom sx={{ fontWeight: 600 }}>
            Error Occurred
          </Typography>
        </motion.div>
        <Typography 
          variant="body1" 
          color="error" 
          sx={{ 
            textAlign: 'center', 
            maxWidth: '600px',
            opacity: 0.9
          }}
        >
          {error}
        </Typography>
        <Button
          variant="outlined"
          color="error"
          size="large"
          onClick={() => window.location.reload()}
          sx={{ marginTop: 2 }}
        >
          Try Again
        </Button>
      </ErrorWrapper>
    );
  }

  if (!analysis || analysis.risks.length === 0) {
    return (
      <EmptyStateWrapper>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography 
            variant="h5" 
            color="primary" 
            gutterBottom 
            sx={{ 
              fontWeight: 600,
              textAlign: 'center',
              marginBottom: 2
            }}
          >
            Ready to Analyze Risks
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ 
              textAlign: 'center',
              maxWidth: '500px',
              marginBottom: 3
            }}
          >
            Select a business type and region above to generate a detailed risk analysis for your operations.
          </Typography>
        </motion.div>
      </EmptyStateWrapper>
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
