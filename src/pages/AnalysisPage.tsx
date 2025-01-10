import React from 'react';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Container, Typography, Grid, IconButton } from '@mui/material';
import { ArrowBack, Assessment, Security, Gavel, AccountBalance, TrendingUp } from '@mui/icons-material';
import RiskCard from '../components/RiskCard';
import { RiskAnalysis, BusinessType, Region } from '../types';

const PageContainer = styled('div')`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a237e 0%, #0d47a1 100%);
  padding: 40px 0;
`;

const Header = styled('div')`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  padding: 0 24px;
`;

const BackButton = styled(IconButton)`
  color: white;
  background: rgba(255, 255, 255, 0.1);
  margin-right: 20px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const HeaderContent = styled('div')`
  flex: 1;
`;

const StyledContainer = styled(Container)`
  position: relative;
`;

const CategoryHeader = styled('div')`
  margin: 40px 0 20px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const CategoryIcon = styled('div')`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  
  .MuiSvgIcon-root {
    color: white;
    font-size: 28px;
  }
`;

const Stats = styled(Grid)`
  margin-top: 32px;
  padding: 0 24px;
`;

const StatCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  color: white;
  display: flex;
  align-items: center;
  gap: 16px;
  
  .icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    
    .MuiSvgIcon-root {
      color: white;
      font-size: 24px;
    }
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

  return (
    <PageContainer>
      <StyledContainer maxWidth="xl">
        <Header>
          <BackButton onClick={onBack}>
            <ArrowBack />
          </BackButton>
          <HeaderContent>
            <Typography 
              variant="h4" 
              color="white" 
              gutterBottom 
              sx={{ fontWeight: 600 }}
            >
              Risk Analysis Report
            </Typography>
            <Typography variant="h6" color="rgba(255, 255, 255, 0.8)">
              {selectedBusiness.label} • {selectedRegion.label}
            </Typography>
          </HeaderContent>
        </Header>

        <Stats container spacing={3}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <StatCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="icon">
                  {stat.icon}
                </div>
                <div>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    {stat.label}
                  </Typography>
                </div>
              </StatCard>
            </Grid>
          ))}
        </Stats>

        {Object.entries(risksByCategory).map(([category, risks], categoryIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.2 }}
          >
            <CategoryHeader>
              <CategoryIcon>
                {getCategoryIcon(category)}
              </CategoryIcon>
              <Typography variant="h5" color="white" sx={{ fontWeight: 500 }}>
                {category}
              </Typography>
            </CategoryHeader>
            
            <Grid container spacing={3}>
              {risks.map((risk, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <RiskCard risk={risk} index={index} />
                </Grid>
              ))}
            </Grid>
          </motion.div>
        ))}
      </StyledContainer>
    </PageContainer>
  );
};

export default AnalysisPage;
