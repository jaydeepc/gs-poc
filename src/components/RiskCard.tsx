import React from 'react';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { Card, CardContent, Typography, Chip, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Warning, CheckCircle, ArrowForward, Business, AccountBalance, Assessment } from '@mui/icons-material';
import { Risk } from '../types';

interface StyledCardProps {
  severity: string;
}

const StyledCard = styled(motion(Card))<StyledCardProps>`
  margin: 24px 0;
  border-radius: 20px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.3) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    z-index: 0;
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
    
    &::after {
      opacity: 1;
    }
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: ${({ severity }) => {
      switch (severity.toLowerCase()) {
        case 'high':
          return 'linear-gradient(90deg, #ef5350 0%, #f44336 100%)';
        case 'medium':
          return 'linear-gradient(90deg, #fb8c00 0%, #f57c00 100%)';
        case 'low':
          return 'linear-gradient(90deg, #66bb6a 0%, #43a047 100%)';
        default:
          return 'linear-gradient(90deg, #90caf9 0%, #42a5f5 100%)';
      }
    }};
    opacity: 0.8;
    transition: opacity 0.3s ease;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${({ severity }) => {
      switch (severity.toLowerCase()) {
        case 'high':
          return 'linear-gradient(90deg, #ff4d4d 0%, #ff8080 100%)';
        case 'medium':
          return 'linear-gradient(90deg, #ffa726 0%, #ffcc80 100%)';
        case 'low':
          return 'linear-gradient(90deg, #66bb6a 0%, #a5d6a7 100%)';
        default:
          return 'linear-gradient(90deg, #90caf9 0%, #bbdefb 100%)';
      }
    }};
  }
`;

const StyledCardContent = styled(CardContent)`
  padding: 32px;
  position: relative;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at top right,
      rgba(255, 255, 255, 0.95) 0%,
      rgba(255, 255, 255, 0.7) 100%
    );
    z-index: -1;
  }
`;

const SectionTitle = styled(Typography)`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
  margin-bottom: 12px;
  color: #1976d2;
  font-weight: 600;
  
  .MuiSvgIcon-root {
    font-size: 20px;
  }
`;

const RiskHeader = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const SeverityChip = styled(Chip)<{ severity: string }>`
  font-weight: 600;
  padding: 4px 12px;
  height: 28px;
  border-radius: 14px;
  ${({ severity }) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return `
          background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%);
          color: #c62828;
          border: 1px solid #ef9a9a;
        `;
      case 'medium':
        return `
          background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
          color: #ef6c00;
          border: 1px solid #ffcc80;
        `;
      case 'low':
        return `
          background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
          color: #2e7d32;
          border: 1px solid #a5d6a7;
        `;
      default:
        return '';
    }
  }}
  
  .MuiChip-icon {
    color: inherit;
    margin-left: 4px;
  }
`;

const StyledList = styled(List)`
  padding: 0;
  margin-top: 16px;
`;

const StyledListItem = styled(ListItem)`
  padding: 12px 0;
  transition: all 0.2s ease;
  border-radius: 8px;
  
  &:hover {
    background: rgba(0, 0, 0, 0.02);
    padding-left: 8px;
  }
  
  .MuiListItemIcon-root {
    min-width: 40px;
  }
  
  .MuiSvgIcon-root {
    transition: transform 0.2s ease;
  }
  
  &:hover .MuiSvgIcon-root {
    transform: scale(1.1);
  }
`;

const CategoryChip = styled(Chip)`
  margin-right: 12px;
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  color: #1565c0;
  border: 1px solid #90caf9;
  font-weight: 500;
  padding: 4px 8px;
  height: 28px;
  
  .MuiChip-icon {
    color: #1976d2;
  }
`;

interface RiskCardProps {
  risk: Risk;
  index: number;
}

const RiskCard: React.FC<RiskCardProps> = ({ risk, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1
      }
    }
  };

  return (
    <StyledCard
      severity={risk.severity}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <StyledCardContent>
        <RiskHeader>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CategoryChip
              icon={<Business />}
              label={risk.category}
              size="small"
            />
            <Typography variant="h6" component="h3">
              {risk.title}
            </Typography>
          </div>
          <SeverityChip
            icon={<Warning />}
            label={risk.severity}
            severity={risk.severity}
          />
        </RiskHeader>

        <Typography variant="body1" color="text.secondary" paragraph>
          {risk.description}
        </Typography>

        <SectionTitle variant="subtitle1">
          <Business fontSize="small" /> Regional Relevance
        </SectionTitle>
        <Typography variant="body2" paragraph>
          {risk.relevance_explanation}
        </Typography>

        <SectionTitle variant="subtitle1">
          <CheckCircle fontSize="small" /> Resolution Steps
        </SectionTitle>
        <StyledList>
          {risk.resolution_steps.map((step, idx) => (
            <StyledListItem key={idx}>
              <ListItemIcon>
                <ArrowForward color="primary" />
              </ListItemIcon>
              <ListItemText primary={step} />
            </StyledListItem>
          ))}
        </StyledList>

        <SectionTitle variant="subtitle1">
          <AccountBalance fontSize="small" /> Regulatory Bodies
        </SectionTitle>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
          {risk.regulatory_bodies.map((body, idx) => (
            <Chip
              key={idx}
              icon={<AccountBalance />}
              label={body}
              variant="outlined"
              size="small"
            />
          ))}
        </div>

        <SectionTitle variant="subtitle1">
          <Assessment fontSize="small" /> Regional Factors
        </SectionTitle>
        <StyledList>
          {risk.regional_specific_factors.map((factor, idx) => (
            <StyledListItem key={idx}>
              <ListItemIcon>
                <CheckCircle color="success" />
              </ListItemIcon>
              <ListItemText primary={factor} />
            </StyledListItem>
          ))}
        </StyledList>
      </StyledCardContent>
    </StyledCard>
  );
};

export default RiskCard;
