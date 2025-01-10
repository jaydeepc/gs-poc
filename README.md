# Goldman Sachs Risk Audit Application

A sophisticated risk analysis tool built for Goldman Sachs that leverages AI to provide detailed, region-specific business risk assessments.

## Features

- **AI-Powered Analysis**: Utilizes OpenAI's GPT-4o model for comprehensive risk assessment
- **Region-Specific Analysis**: Customized risk evaluation based on geographical regions
- **Multiple Business Types**: Support for various business sectors including:
  - Mortgage Services
  - Investment Banking
  - Asset Management
  - Retail Banking
  - Corporate Lending

- **Detailed Risk Categories**:
  - Regulatory Compliance
  - Market Risks
  - Operational Risks
  - Financial Risks
  - Legal and Political Risks

- **Modern UI/UX**:
  - Animated risk cards
  - Intuitive interface
  - Severity indicators
  - Professional design

## Technical Stack

- React 18+ with TypeScript
- Material-UI for components
- Framer Motion for animations
- OpenAI API integration
- Vite for build tooling

## Getting Started

1. Clone the repository:
   ```bash
   git clone git@github.com:jaydeepc/gs-poc.git
   cd gs-poc/gs-risk-audit
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your OpenAI API key:
   ```
   VITE_OPENAI_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open http://localhost:5173 in your browser

## Usage

1. Select a business type from the dropdown menu
2. Choose the region of operation
3. Click "Analyze Risks" to generate a detailed risk assessment
4. Review the generated risks, each with:
   - Severity level
   - Detailed description
   - Regional relevance
   - Resolution steps
   - Regulatory bodies involved
   - Region-specific factors

## Security Note

- The `.env` file containing the API key is excluded from version control
- Always use environment variables for sensitive credentials
- Follow security best practices when deploying

## License

Proprietary - Goldman Sachs 2024
