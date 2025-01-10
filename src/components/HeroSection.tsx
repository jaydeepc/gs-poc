import React from 'react';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { Typography, Box } from '@mui/material';
import { Analytics, Security, Timeline } from '@mui/icons-material';

const HeroContainer = styled('div')`
  position: relative;
  padding: 60px 0;
  background: linear-gradient(135deg, #000428 0%, #004e92 100%);
  overflow: hidden;
  
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

const GradientText = styled(Typography)`
  background: linear-gradient(90deg, #64B5F6 0%, #E1F5FE 50%, #64B5F6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% auto;
  animation: shine 3s linear infinite;
  
  @keyframes shine {
    to {
      background-position: 200% center;
    }
  }
`;

const FeatureGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 48px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 24px;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`;

const IconWrapper = styled(Box)`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  margin-bottom: 16px;
`;

const features = [
  {
    icon: <Analytics sx={{ fontSize: 32, color: '#64B5F6' }} />,
    title: 'AI-Powered Analysis',
    description: 'Leverage advanced AI to identify and assess business risks across regions'
  },
  {
    icon: <Security sx={{ fontSize: 32, color: '#64B5F6' }} />,
    title: 'Compliance Focused',
    description: 'Stay compliant with region-specific regulations and requirements'
  },
  {
    icon: <Timeline sx={{ fontSize: 32, color: '#64B5F6' }} />,
    title: 'Real-time Insights',
    description: 'Get instant, actionable insights for risk mitigation strategies'
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const HeroSection: React.FC = () => {
  return (
    <HeroContainer>
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 24px'
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <GradientText variant="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            Goldman Sachs Risk Audit
          </GradientText>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <Typography
            variant="h5"
            color="rgba(255, 255, 255, 0.9)"
            gutterBottom
            sx={{ mb: 4 }}
          >
            Advanced risk analysis powered by artificial intelligence
          </Typography>
        </motion.div>
      </Box>

      <FeatureGrid>
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <IconWrapper>
              {feature.icon}
            </IconWrapper>
            <Typography
              variant="h6"
              color="white"
              gutterBottom
              sx={{ fontWeight: 500 }}
            >
              {feature.title}
            </Typography>
            <Typography
              variant="body1"
              color="rgba(255, 255, 255, 0.7)"
            >
              {feature.description}
            </Typography>
          </FeatureCard>
        ))}
      </FeatureGrid>
    </HeroContainer>
  );
};

export default HeroSection;
