import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { BusinessType, Region, RiskAnalysis } from './types';
import HeroSection from './components/HeroSection';
import SelectionForm from './components/SelectionForm';
import AnalysisPage from './pages/AnalysisPage';
import { generateRiskAnalysis } from './services/openai';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f5f5f5',
    }
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
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          minHeight: '100vh'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          padding: '10px 24px'
        }
      }
    }
  }
});

const App = () => {
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessType | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [analysis, setAnalysis] = useState<RiskAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);

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
      setShowAnalysis(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(`Failed to generate risk analysis: ${errorMessage}`);
      console.error('Analysis error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setShowAnalysis(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AnimatePresence mode="wait">
        {!showAnalysis ? (
          <motion.div
            key="selection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <HeroSection />
            <SelectionForm
              selectedBusiness={selectedBusiness}
              selectedRegion={selectedRegion}
              onBusinessSelect={setSelectedBusiness}
              onRegionSelect={setSelectedRegion}
              onAnalyze={handleAnalyze}
              isLoading={isLoading}
              error={error}
            />
          </motion.div>
        ) : analysis && (
          <motion.div
            key="analysis"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <AnalysisPage
              analysis={analysis}
              selectedBusiness={selectedBusiness!}
              selectedRegion={selectedRegion!}
              onBack={handleBack}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default App;
