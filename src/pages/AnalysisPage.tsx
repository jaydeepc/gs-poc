import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Typography, Grid, IconButton, Box, Tabs, Tab } from '@mui/material';
import { ArrowBack, Assessment, Security, Gavel, AccountBalance, TrendingUp } from '@mui/icons-material';
import RiskCard from '../components/RiskCard';
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
  margin-bottom: 24px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  
  @media (max-width: 899px) {
    margin-bottom: 16px;
  }
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

const TabPanel = styled('div')`
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

  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <PageContainer>
      <Sidebar>
        <BackButton onClick={onBack}>
          <ArrowBack />
        </BackButton>
        
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          Risk Analysis Report
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.8, mb: { xs: 2, md: 4 } }}>
          {selectedBusiness.label} • {selectedRegion.label}
        </Typography>

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
          <StyledTabs
            value={currentTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
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

          {Object.entries(risksByCategory).map(([category, risks], index) => (
            <TabPanel
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
            </TabPanel>
          ))}
        </TabsContainer>
      </MainContent>
    </PageContainer>
  );
};

export default AnalysisPage;
