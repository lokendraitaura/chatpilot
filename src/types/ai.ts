export interface AIMessageRequest {
  purpose: string;
  tone: string;
  length?: 'short' | 'medium' | 'long';
  context?: string;
}

export interface AIMessageResponse {
  message: string;
  alternatives?: string[];
}

export interface AIImproveRequest {
  message: string;
  improvementType: string;
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
  tone: string;
}
