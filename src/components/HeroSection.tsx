import React from 'react';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { Container, Grid } from '@mui/material';
import { Analytics, Security, Timeline } from '@mui/icons-material';
import { BusinessType, Region } from '../types';
import SelectionForm from './SelectionForm';

const HeroContainer = styled('div')`
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #1a237e 0%, #0d47a1 100%);
  overflow: hidden;
  padding: 80px 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  }
`;

const HeroContent = styled('div')`
  color: white;
  max-width: 600px;
  
  h1 {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    line-height: 1.2;
    
    span {
      background: linear-gradient(90deg, #64B5F6, #E1F5FE);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  
  p {
    font-size: 1.25rem;
    opacity: 0.9;
    margin-bottom: 2rem;
    line-height: 1.6;
  }
`;

const Features = styled('div')`
  display: flex;
  gap: 24px;
  margin-top: 48px;
  
  .feature {
    display: flex;
    align-items: center;
    gap: 12px;
    
    .icon {
      width: 40px;
      height: 40px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      
      .MuiSvgIcon-root {
        color: #64B5F6;
        font-size: 24px;
      }
    }
    
    .text {
      color: rgba(255, 255, 255, 0.9);
      font-size: 0.9rem;
    }
  }
`;

interface HeroSectionProps {
  selectedBusiness: BusinessType | null;
  selectedRegion: Region | null;
  onBusinessSelect: (business: BusinessType | null) => void;
  onRegionSelect: (region: Region | null) => void;
  onAnalyze: () => void;
  isLoading: boolean;
  error?: string | null;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  selectedBusiness,
  selectedRegion,
  onBusinessSelect,
  onRegionSelect,
  onAnalyze,
  isLoading,
  error
}) => {
  return (
    <HeroContainer>
      <Container maxWidth="lg">
        <Grid container spacing={8} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <HeroContent>
                <h1>
                  Intelligent <span>Risk Analysis</span> for Your Business
                </h1>
                <p>
                  Leverage advanced AI to identify and assess business risks across regions. 
                  Get detailed insights and actionable recommendations tailored to your needs.
                </p>

                <Features>
                  <div className="feature">
                    <div className="icon">
                      <Analytics />
                    </div>
                    <div className="text">AI-Powered Analysis</div>
                  </div>
                  <div className="feature">
                    <div className="icon">
                      <Security />
                    </div>
                    <div className="text">Compliance Focused</div>
                  </div>
                  <div className="feature">
                    <div className="icon">
                      <Timeline />
                    </div>
                    <div className="text">Real-time Insights</div>
                  </div>
                </Features>
              </HeroContent>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <SelectionForm
                selectedBusiness={selectedBusiness}
                selectedRegion={selectedRegion}
                onBusinessSelect={onBusinessSelect}
                onRegionSelect={onRegionSelect}
                onAnalyze={onAnalyze}
                isLoading={isLoading}
                error={error}
              />
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </HeroContainer>
  );
};

export default HeroSection;
