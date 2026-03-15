export interface GenerationOptions {
  prompt?: string;
  message?: string;
  topic?: string;
  query?: string;
  targetLanguage?: string;
  name?: string;
  city?: string;
  product?: string;
}

export interface ProviderResponse {
  success: boolean;
  data?: string;
  error?: string;
}

export interface AIProvider {
  name: string;
  generate(template: any, options: GenerationOptions): Promise<ProviderResponse>;
}
