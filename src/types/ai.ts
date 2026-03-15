export interface AIMessageRequest {
  purpose: string;
  tone: 'professional' | 'friendly' | 'casual' | 'formal' | 'enthusiastic' | 'persuasive';
  length?: 'short' | 'medium' | 'long';
  context?: string;
}

export interface AIMessageResponse {
  message: string;
  alternatives?: string[];
}

export interface AIImproveRequest {
  message: string;
  improvementType: 'professional' | 'friendly' | 'concise' | 'detailed' | 'persuasive' | 'apologetic';
}

export interface AITranslateRequest {
  text: string;
  sourceLanguage: string;
  targetLanguage: string;
}

export interface EmojiSuggestion {
  emoji: string;
  relevance: number;
  context: string;
}

export interface CustomerReplyContext {
  customerMessage: string;
  businessContext?: string;
  tone: 'helpful' | 'apologetic' | 'professional' | 'friendly';
}
