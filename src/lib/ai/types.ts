import type { PromptTemplate } from "@langchain/core/prompts";

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
  // Using any here for the generics of PromptTemplate to satisfy broader use cases without strict type matching everywhere
  generate(template: PromptTemplate<any, any>, options: GenerationOptions): Promise<string>;
}
