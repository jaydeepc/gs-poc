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
  margin: 0 0 16px;
  border-radius: 12px;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  @media (max-width: 899px) {
    margin: 0 0 12px;
    border-radius: 8px;
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
          return 'linear-gradient(90deg, #ef5350, #f44336)';
        case 'medium':
          return 'linear-gradient(90deg, #fb8c00, #f57c00)';
        case 'low':
          return 'linear-gradient(90deg, #66bb6a, #43a047)';
        default:
          return 'linear-gradient(90deg, #90caf9, #42a5f5)';
      }
    }};
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
`;

const StyledCardContent = styled(CardContent)`
  padding: 24px;
  
  @media (max-width: 899px) {
    padding: 16px;
  }
`;

const RiskHeader = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  
  @media (max-width: 899px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 12px;
  }
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
          background: linear-gradient(135deg, #ffebee, #ffcdd2);
          color: #c62828;
          border: 1px solid #ef9a9a;
        `;
      case 'medium':
        return `
          background: linear-gradient(135deg, #fff3e0, #ffe0b2);
          color: #ef6c00;
          border: 1px solid #ffcc80;
        `;
      case 'low':
        return `
          background: linear-gradient(135deg, #e8f5e9, #c8e6c9);
          color: #2e7d32;
          border: 1px solid #a5d6a7;
        `;
      default:
        return '';
    }
  }}
  
  @media (max-width: 899px) {
    height: 24px;
    font-size: 0.75rem;
    padding: 4px 8px;
    
    .MuiChip-icon {
      font-size: 14px;
    }
  }
`;

const Section = styled('div')`
  margin-top: 16px;
  
  @media (max-width: 899px) {
    margin-top: 12px;
  }
  
  .section-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
    
    .MuiSvgIcon-root {
      font-size: 18px;
      color: #1976d2;
      
      @media (max-width: 899px) {
        font-size: 16px;
      }
    }
    
    .title {
      font-weight: 600;
      color: #1976d2;
      font-size: 0.9rem;
      
      @media (max-width: 899px) {
        font-size: 0.85rem;
      }
    }
  }
`;

const StyledList = styled(List)`
  padding: 0;
`;

const StyledListItem = styled(ListItem)`
  padding: 8px 0;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(0, 0, 0, 0.02);
    padding-left: 8px;
  }
  
  .MuiListItemIcon-root {
    min-width: 36px;
    
    @media (max-width: 899px) {
      min-width: 32px;
    }
  }
  
  .MuiSvgIcon-root {
    font-size: 18px;
    
    @media (max-width: 899px) {
      font-size: 16px;
    }
  }
`;

const CategoryChip = styled(Chip)`
  margin-right: 12px;
  background: linear-gradient(135deg, #e3f2fd, #bbdefb);
  color: #1565c0;
  border: 1px solid #90caf9;
  font-weight: 500;
  height: 24px;
  
  .MuiChip-icon {
    font-size: 16px;
    color: #1976d2;
  }
  
  @media (max-width: 899px) {
    height: 20px;
    font-size: 0.75rem;
    margin-right: 8px;
    
    .MuiChip-icon {
      font-size: 14px;
    }
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
      whileHover={{ scale: 1.01 }}
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
            <Typography 
              variant="h6" 
              sx={{ 
                fontSize: { xs: '1rem', sm: '1.1rem' }, 
                fontWeight: 600 
              }}
            >
              {risk.title}
            </Typography>
          </div>
          <SeverityChip
            icon={<Warning />}
            label={risk.severity}
            severity={risk.severity}
          />
        </RiskHeader>

        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ mb: { xs: 1.5, sm: 2 } }}
        >
          {risk.description}
        </Typography>

        <Section>
          <div className="section-header">
            <Business fontSize="small" />
            <span className="title">Regional Relevance</span>
          </div>
          <Typography variant="body2" color="text.secondary">
            {risk.relevance_explanation}
          </Typography>
        </Section>

        <Section>
          <div className="section-header">
            <CheckCircle fontSize="small" />
            <span className="title">Resolution Steps</span>
          </div>
          <StyledList>
            {risk.resolution_steps.map((step, idx) => (
              <StyledListItem key={idx}>
                <ListItemIcon>
                  <ArrowForward color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary={step}
                  primaryTypographyProps={{ variant: 'body2' }}
                />
              </StyledListItem>
            ))}
          </StyledList>
        </Section>

        <Section>
          <div className="section-header">
            <AccountBalance fontSize="small" />
            <span className="title">Regulatory Bodies</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {risk.regulatory_bodies.map((body, idx) => (
              <Chip
                key={idx}
                icon={<AccountBalance />}
                label={body}
                variant="outlined"
                size="small"
                sx={{ 
                  height: { xs: '20px', sm: '24px' },
                  '& .MuiChip-icon': { 
                    fontSize: { xs: '14px', sm: '16px' } 
                  },
                  fontSize: { xs: '0.75rem', sm: '0.8125rem' }
                }}
              />
            ))}
          </div>
        </Section>

        <Section>
          <div className="section-header">
            <Assessment fontSize="small" />
            <span className="title">Regional Factors</span>
          </div>
          <StyledList>
            {risk.regional_specific_factors.map((factor, idx) => (
              <StyledListItem key={idx}>
                <ListItemIcon>
                  <CheckCircle color="success" />
                </ListItemIcon>
                <ListItemText 
                  primary={factor}
                  primaryTypographyProps={{ variant: 'body2' }}
                />
              </StyledListItem>
            ))}
          </StyledList>
        </Section>
      </StyledCardContent>
    </StyledCard>
  );
};

export default RiskCard;
