
export interface BrandIdentity {
  brandName: string;
  tagline: string;
  description: string;
  voice: string[];
  marketingIdeas: string[];
}

export interface UserInput {
  industry: string;
  targetAudience: string;
  brandTone: string;
}

export enum AppState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
