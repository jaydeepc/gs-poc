export interface Risk {
  category: string;
  title: string;
  description: string;
  relevance_explanation: string;
  severity: 'High' | 'Medium' | 'Low';
  severity_justification: string;
  resolution_steps: string[];
  regulatory_bodies: string[];
  regional_specific_factors: string[];
}

export interface RiskAnalysis {
  risks: Risk[];
}

export interface BusinessType {
  value: string;
  label: string;
}

export interface Region {
  value: string;
  label: string;
}
