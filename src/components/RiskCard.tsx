import React from 'react';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { Card, CardContent, Typography, Chip, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Warning, CheckCircle, ArrowForward, Business, AccountBalance } from '@mui/icons-material';
import { Risk } from '../types';

const StyledCard = styled(motion(Card))`
  margin: 16px 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  background: #ffffff;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
`;

const StyledCardContent = styled(CardContent)`
  padding: 24px;
`;

const RiskHeader = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const SeverityChip = styled(Chip)<{ severity: string }>`
  font-weight: 600;
  ${({ severity }) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return 'background-color: #ffebee; color: #d32f2f;';
      case 'medium':
        return 'background-color: #fff3e0; color: #f57c00;';
      case 'low':
        return 'background-color: #e8f5e9; color: #388e3c;';
      default:
        return '';
    }
  }}
`;

const StyledList = styled(List)`
  padding: 0;
`;

const StyledListItem = styled(ListItem)`
  padding: 8px 0;
`;

const CategoryChip = styled(Chip)`
  margin-right: 8px;
  background-color: #e3f2fd;
  color: #1976d2;
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

        <Typography variant="subtitle1" color="primary" gutterBottom>
          Regional Relevance
        </Typography>
        <Typography variant="body2" paragraph>
          {risk.relevance_explanation}
        </Typography>

        <Typography variant="subtitle1" color="primary" gutterBottom>
          Resolution Steps
        </Typography>
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

        <Typography variant="subtitle1" color="primary" gutterBottom style={{ marginTop: '16px' }}>
          Regulatory Bodies
        </Typography>
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

        <Typography variant="subtitle1" color="primary" gutterBottom>
          Regional Factors
        </Typography>
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
