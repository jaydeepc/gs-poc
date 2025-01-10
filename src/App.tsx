import React, { useState } from 'react';
import { ThemeProvider, createTheme, styled, alpha } from '@mui/material/styles';
import { Container, Button, Box, CssBaseline, Paper } from '@mui/material';
import { BusinessType, Region, RiskAnalysis } from './types';
import BusinessSelector from './components/BusinessSelector';
import RegionSelector from './components/RegionSelector';
import RiskDisplay from './components/RiskDisplay';
import HeroSection from './components/HeroSection';
import { generateRiskAnalysis } from './services/openai';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 500 },
    h6: { fontWeight: 500 }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          padding: '10px 24px',
        },
      },
    },
  },
});

const MainContent = styled('main')`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const ContentContainer = styled(Container)`
  padding: 40px 24px;
`;

const SelectionContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
  padding: 32px;
  background: ${({ theme }) => alpha(theme.palette.background.paper, 0.9)};
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const AnalyzeButton = styled(Button)`
  background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
  transition: all 0.3s ease;
  text-transform: none;
  font-size: 1.1rem;
  padding: 12px 0;
  
  &:hover {
    background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

function App() {
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessType | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [analysis, setAnalysis] = useState<RiskAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!selectedBusiness || !selectedRegion) {
      setError('Please select both a business type and region');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await generateRiskAnalysis(
        selectedBusiness.value,
        selectedRegion.value
      );
      setAnalysis(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(`Failed to generate risk analysis: ${errorMessage}`);
      console.error('Analysis error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainContent>
        <HeroSection />
        <ContentContainer>
          <SelectionContainer elevation={0}>
          <BusinessSelector
            value={selectedBusiness}
            onSelect={setSelectedBusiness}
          />
          <RegionSelector
            value={selectedRegion}
            onSelect={setSelectedRegion}
          />
          <AnalyzeButton
            variant="contained"
            size="large"
            fullWidth
            onClick={handleAnalyze}
            disabled={!selectedBusiness || !selectedRegion || isLoading}
          >
            {isLoading ? 'Analyzing Risks...' : 'Generate Risk Analysis'}
          </AnalyzeButton>
          </SelectionContainer>

          <Box mt={4}>
            <RiskDisplay
              analysis={analysis}
              isLoading={isLoading}
              error={error}
            />
          </Box>
        </ContentContainer>
      </MainContent>
    </ThemeProvider>
  );
}

export default App;
