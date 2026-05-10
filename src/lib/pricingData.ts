import { ToolName } from '../types';

export interface PricingPlan {
  name: string;
  pricePerSeatMonthly: number;
  billing: 'monthly' | 'usage';
}

export const pricingData: Record<ToolName, PricingPlan[]> = {
  'Cursor': [
    { name: 'Basic', pricePerSeatMonthly: 0, billing: 'monthly' },
    { name: 'Pro', pricePerSeatMonthly: 20, billing: 'monthly' },
    { name: 'Business', pricePerSeatMonthly: 40, billing: 'monthly' },
    { name: 'Enterprise', pricePerSeatMonthly: 40, billing: 'monthly' },
  ],
  'GitHub Copilot': [
    { name: 'Individual', pricePerSeatMonthly: 10, billing: 'monthly' },
    { name: 'Business', pricePerSeatMonthly: 19, billing: 'monthly' },
    { name: 'Enterprise', pricePerSeatMonthly: 39, billing: 'monthly' },
  ],
  'Claude': [
    { name: 'Free', pricePerSeatMonthly: 0, billing: 'monthly' },
    { name: 'Pro', pricePerSeatMonthly: 20, billing: 'monthly' },
    { name: 'Team', pricePerSeatMonthly: 30, billing: 'monthly' },
    { name: 'Max', pricePerSeatMonthly: 100, billing: 'monthly' },
    { name: 'Enterprise', pricePerSeatMonthly: 60, billing: 'monthly' },
  ],
  'ChatGPT': [
    { name: 'Free', pricePerSeatMonthly: 0, billing: 'monthly' },
    { name: 'Plus', pricePerSeatMonthly: 20, billing: 'monthly' },
    { name: 'Team', pricePerSeatMonthly: 30, billing: 'monthly' },
    { name: 'Enterprise', pricePerSeatMonthly: 60, billing: 'monthly' },
  ],
  'Anthropic API': [
    { name: 'Pay-as-you-go', pricePerSeatMonthly: 0, billing: 'usage' },
  ],
  'OpenAI API': [
    { name: 'Pay-as-you-go', pricePerSeatMonthly: 0, billing: 'usage' },
  ],
  'Gemini': [
    { name: 'Free', pricePerSeatMonthly: 0, billing: 'monthly' },
    { name: 'Advanced', pricePerSeatMonthly: 20, billing: 'monthly' },
  ],
  'Windsurf': [
    { name: 'Free', pricePerSeatMonthly: 0, billing: 'monthly' },
    { name: 'Pro', pricePerSeatMonthly: 15, billing: 'monthly' },
  ],
};
