import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Typography, Grid, IconButton, Box, Tabs, Tab } from '@mui/material';
import { ArrowBack, Assessment, Security, Gavel, AccountBalance, TrendingUp, ChevronRight } from '@mui/icons-material';
import RiskCard from '../components/RiskCard';
import Logo from '../components/Logo';
import { RiskAnalysis, BusinessType, Region } from '../types';

const PageContainer = styled('div')`
  min-height: 100vh;
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
  
  @media (min-width: 900px) {
    flex-direction: row;
  }
`;

const Sidebar = styled('div')`
  background: linear-gradient(135deg, #1a237e 0%, #0d47a1 100%);
  padding: 24px;
  color: white;
  
  @media (min-width: 900px) {
    width: 320px;
    position: fixed;
    height: 100vh;
    overflow-y: auto;
    padding: 32px;
  }
  
  @media (max-width: 899px) {
    padding: 20px;
  }
`;

const MainContent = styled('div')`
  flex: 1;
  padding: 24px;
  
  @media (min-width: 900px) {
    margin-left: 320px;
    padding: 32px;
    max-width: calc(100vw - 320px);
  }
  
  @media (max-width: 899px) {
    padding: 16px;
  }
`;

const BackButton = styled(IconButton)`
  color: white;
  background: rgba(255, 255, 255, 0.1);
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const HeaderSection = styled('div')`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 24px;
  
  @media (max-width: 899px) {
    margin-bottom: 16px;
    gap: 16px;
  }
  
  .logo-wrapper {
    transform: scale(1.2);
    
    @media (max-width: 899px) {
      transform: scale(1.1);
    }
  }
`;

const HeaderContent = styled('div')`
  flex: 1;
`;

const StatsContainer = styled('div')`
  @media (max-width: 899px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-top: 16px;
  }
`;

const StatCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  
  @media (max-width: 899px) {
    margin-bottom: 0;
    padding: 16px;
    
    .header {
      margin-bottom: 4px !important;
    }
  }
  
  .header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 8px;
    
    .icon {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      
      @media (max-width: 899px) {
        width: 32px;
        height: 32px;
      }
      
      .MuiSvgIcon-root {
        color: white;
        font-size: 20px;
        
        @media (max-width: 899px) {
          font-size: 16px;
        }
      }
    }
  }
  
  h4 {
    @media (max-width: 899px) {
      font-size: 1.5rem;
    }
  }
`;

const TabsContainer = styled('div')`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  margin-bottom: 24px;
  
  @media (max-width: 899px) {
    margin: 0 -16px;
    border-radius: 0;
  }
`;

const TabsWrapper = styled('div')`
  position: relative;
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  z-index: 2;
  display: none;
  
  @media (max-width: 899px) {
    display: flex;
    align-items: center;
    justify-content: center;
    
    .MuiSvgIcon-root {
      color: rgba(0, 0, 0, 0.7);
      font-size: 24px;
    }
  }
`;

const StyledTabs = styled(Tabs)`
  .MuiTabs-indicator {
    height: 3px;
    border-radius: 3px;
  }
  
  @media (max-width: 899px) {
    .MuiTabs-flexContainer {
      gap: 8px;
      padding: 8px;
    }
    
    .MuiTabs-scrollButtons {
      opacity: 0.8;
      width: 36px;
      
      &.Mui-disabled {
        opacity: 0.3;
      }
    }
  }
  
  &::after {
    @media (max-width: 899px) {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      width: 24px;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.9));
      pointer-events: none;
      opacity: 0.8;
    }
  }
  
  &::before {
    @media (max-width: 899px) {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 24px;
      background: linear-gradient(270deg, transparent, rgba(255, 255, 255, 0.9));
      pointer-events: none;
      opacity: 0.8;
      z-index: 1;
    }
  }
`;

const StyledTab = styled(Tab)`
  text-transform: none;
  font-weight: 600;
  min-height: 56px;
  
  &.Mui-selected {
    color: #1976d2;
  }
  
  @media (max-width: 899px) {
    min-height: 48px;
    padding: 6px 12px;
    font-size: 0.875rem;
    
    .MuiSvgIcon-root {
      font-size: 18px;
    }
  }
`;

const TabContent = styled('div')`
  padding: 24px;
  
  @media (max-width: 899px) {
    padding: 16px 12px;
  }
`;

const RiskGrid = styled(Grid)`
  margin-top: 24px;
  
  @media (max-width: 899px) {
    margin-top: 16px;
  }
`;

interface AnalysisPageProps {
  analysis: RiskAnalysis;
  selectedBusiness: BusinessType;
  selectedRegion: Region;
  onBack: () => void;
}

const AnalysisPage: React.FC<AnalysisPageProps> = ({
  analysis,
  selectedBusiness,
  selectedRegion,
  onBack
}) => {
  const [currentTab, setCurrentTab] = useState(0);

  const risksByCategory = analysis.risks.reduce((acc, risk) => {
    if (!acc[risk.category]) {
      acc[risk.category] = [];
    }
    acc[risk.category].push(risk);
    return acc;
  }, {} as Record<string, typeof analysis.risks>);

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'regulatory compliance':
        return <Gavel />;
      case 'market risks':
        return <TrendingUp />;
      case 'operational risks':
        return <Assessment />;
      case 'financial risks':
        return <AccountBalance />;
      case 'legal and political risks':
        return <Security />;
      default:
        return <Assessment />;
    }
  };

  const stats = [
    {
      icon: <Assessment />,
      label: 'Total Risks Identified',
      value: analysis.risks.length
    },
    {
      icon: <Security />,
      label: 'High Severity Risks',
      value: analysis.risks.filter(r => r.severity.toLowerCase() === 'high').length
    },
    {
      icon: <Gavel />,
      label: 'Regulatory Bodies',
      value: new Set(analysis.risks.flatMap(r => r.regulatory_bodies)).size
    },
    {
      icon: <AccountBalance />,
      label: 'Risk Categories',
      value: Object.keys(risksByCategory).length
    }
  ];

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <PageContainer>
      <Sidebar>
        <HeaderSection>
          <BackButton onClick={onBack}>
            <ArrowBack />
          </BackButton>
          <div className="logo-wrapper">
            <Logo />
          </div>
        </HeaderSection>

        <HeaderContent>
          <Typography variant="body2" sx={{ opacity: 0.8, mb: { xs: 2, md: 4 } }}>
            {selectedBusiness.label} • {selectedRegion.label}
          </Typography>
        </HeaderContent>

        <StatsContainer>
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="header">
                <div className="icon">{stat.icon}</div>
                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                  {stat.value}
                </Typography>
              </div>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                {stat.label}
              </Typography>
            </StatCard>
          ))}
        </StatsContainer>
      </Sidebar>

      <MainContent>
        <TabsContainer>
          <TabsWrapper>
            <ScrollIndicator
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronRight />
            </ScrollIndicator>
            <StyledTabs
              value={currentTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
            >
              {Object.keys(risksByCategory).map((category) => (
                <StyledTab
                  key={category}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {getCategoryIcon(category)}
                      <span>{category}</span>
                    </Box>
                  }
                />
              ))}
            </StyledTabs>
          </TabsWrapper>

          {Object.entries(risksByCategory).map(([category, risks], index) => (
            <TabContent
              key={category}
              role="tabpanel"
              hidden={currentTab !== index}
            >
              {currentTab === index && (
                <RiskGrid container spacing={2}>
                  {risks.map((risk, riskIndex) => (
                    <Grid item xs={12} key={riskIndex}>
                      <RiskCard risk={risk} index={riskIndex} />
                    </Grid>
                  ))}
                </RiskGrid>
              )}
            </TabContent>
          ))}
        </TabsContainer>
      </MainContent>
    </PageContainer>
  );
};

export default AnalysisPage;
