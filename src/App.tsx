import React, { useState } from 'react';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { Container, Typography, Button, Box, CssBaseline } from '@mui/material';
import { BusinessType, Region, RiskAnalysis } from './types';
import BusinessSelector from './components/BusinessSelector';
import RegionSelector from './components/RegionSelector';
import RiskDisplay from './components/RiskDisplay';
import { generateRiskAnalysis } from './services/openai';
import { Analytics } from '@mui/icons-material';

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

const StyledContainer = styled(Container)`
  padding-top: 40px;
  padding-bottom: 40px;
`;

const Header = styled('header')`
  text-align: center;
  margin-bottom: 40px;
`;

const Logo = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 16px;
`;

const SelectionContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 600px;
  margin: 0 auto;
  padding: 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
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
      <StyledContainer>
        <Header>
          <Logo>
            <Analytics sx={{ fontSize: 40, color: 'primary.main' }} />
            <Typography variant="h3" component="h1" color="primary">
              GS Risk Audit
            </Typography>
          </Logo>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Comprehensive Regional Business Risk Analysis
          </Typography>
        </Header>

        <SelectionContainer>
          <BusinessSelector
            value={selectedBusiness}
            onSelect={setSelectedBusiness}
          />
          <RegionSelector
            value={selectedRegion}
            onSelect={setSelectedRegion}
          />
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={handleAnalyze}
            disabled={!selectedBusiness || !selectedRegion || isLoading}
          >
            {isLoading ? 'Analyzing...' : 'Analyze Risks'}
          </Button>
        </SelectionContainer>

        <Box mt={4}>
          <RiskDisplay
            analysis={analysis}
            isLoading={isLoading}
            error={error}
          />
        </Box>
      </StyledContainer>
    </ThemeProvider>
  );
}

export default App;
