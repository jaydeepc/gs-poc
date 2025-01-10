import OpenAI from 'openai';
import { withRetry, getOpenAIErrorMessage } from '../utils/api';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const generateRiskAnalysis = async (businessType: string, region: string) => {
  try {
    const completion = await withRetry(async () => openai.chat.completions.create({
      model: "gpt-4o",
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You are a specialized risk assessment expert for Goldman Sachs, focusing on regional business regulations and compliance. Your analysis should be detailed, specific, and actionable. You must respond with valid JSON only, following the exact schema provided.`
        },
        {
          role: "user",
          content: `Provide a risk analysis in JSON format for a ${businessType} business operating in ${region}. 
          
          Consider the following aspects:
          1. Regulatory Compliance: Specific regulations and requirements in ${region} for ${businessType}
          2. Market Risks: Region-specific market challenges and volatility factors
          3. Operational Risks: Local operational challenges and business continuity concerns
          4. Financial Risks: Currency, interest rate, and regional economic factors
          5. Legal and Political Risks: Regional political stability, legal framework, and enforcement
          
          For each risk:
          - Provide a detailed explanation of why this is specifically relevant to ${region}
          - Include specific examples or scenarios
          - Offer concrete, actionable resolution steps
          - Rate the risk severity (High/Medium/Low) with justification
          - Include relevant local authorities or regulatory bodies involved
          
          IMPORTANT: Your response must be a valid JSON object matching exactly this schema:
          {
            "risks": [
              {
                "category": "string",
                "title": "string",
                "description": "string",
                "relevance_explanation": "string",
                "severity": "string",
                "severity_justification": "string",
                "resolution_steps": ["string"],
                "regulatory_bodies": ["string"],
                "regional_specific_factors": ["string"]
              }
            ]
          }`
        }
      ]
    }));

    const content = completion.choices[0].message.content;
    console.log('OpenAI Response:', content);
    
    if (!content) {
      throw new Error('Empty response from OpenAI');
    }

    try {
      return JSON.parse(content);
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError);
      console.error('Raw response:', content);
      throw new Error('Failed to parse OpenAI response');
    }
  } catch (error) {
    console.error('Error generating risk analysis:', error);
    throw new Error(getOpenAIErrorMessage(error));
  }
};
