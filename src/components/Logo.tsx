import React from 'react';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { Assessment } from '@mui/icons-material';

const LogoContainer = styled('div')`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const IconWrapper = styled('div')`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, #1976d2, #1565c0);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);
  
  .MuiSvgIcon-root {
    color: white;
    font-size: 24px;
  }
  
  @media (max-width: 899px) {
    width: 36px;
    height: 36px;
    
    .MuiSvgIcon-root {
      font-size: 20px;
    }
  }
`;

const LogoText = styled(Typography)`
  font-weight: 700;
  background: linear-gradient(135deg, #1976d2, #64b5f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 1.5rem;
  
  @media (max-width: 899px) {
    font-size: 1.25rem;
  }
  
  span {
    background: linear-gradient(135deg, #64b5f6, #90caf9);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 500;
  }
`;

const Logo: React.FC = () => {
  return (
    <LogoContainer>
      <IconWrapper>
        <Assessment />
      </IconWrapper>
      <LogoText variant="h5">
        Audit<span>Scope</span>
      </LogoText>
    </LogoContainer>
  );
};

export default Logo;
