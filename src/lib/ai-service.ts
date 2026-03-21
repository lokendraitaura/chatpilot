import { PromptTemplate } from "@langchain/core/prompts";
import { GroqProvider } from "./ai/providers/groq";
import { AIProvider, GenerationOptions } from "./ai/types";
import { Llama3FallbackProvider } from "./ai/providers/llama-fallback";

// Registry of available providers
const providers: Record<string, AIProvider> = {
  groq: new GroqProvider(),
  llamaFallback: new Llama3FallbackProvider(),
};

// Current active provider (can be moved to env)
const activeProvider = providers.groq;

// Prompt Templates
export const AI_TEMPLATES = {
  messageGenerator: new PromptTemplate({
    template: "Generate a professional and engaging WhatsApp message based on this prompt: {prompt}. Ensure it's suitable for a business/marketing context.",
    inputVariables: ["prompt"],
  }),
  messageImprover: new PromptTemplate({
    template: "Improve the following WhatsApp message to make it sound more professional, clear, and engaging: {message}. Keep the original meaning but enhance the tone.",
    inputVariables: ["message"],
  }),
  emojiSuggester: new PromptTemplate({
    template: "Add relevant and professional emojis to the following WhatsApp message to make it more expressive: {message}. Don't overdo it.",
    inputVariables: ["message"],
  }),
  languageConverter: new PromptTemplate({
    template: "Translate the following WhatsApp message to {targetLanguage}: {message}. Ensure the translation is natural and culturally appropriate.",
    inputVariables: ["message", "targetLanguage"],
  }),
  customerReply: new PromptTemplate({
    template: "Generate a helpful and polite customer service reply for this query: {query}. The tone should be professional and solution-oriented.",
    inputVariables: ["query"],
  }),
  statusCaption: new PromptTemplate({
    template: "Generate a catchy and short WhatsApp status caption for this topic: {topic}. Use emojis and make it engaging.",
    inputVariables: ["topic"],
  }),
  marketingCopy: new PromptTemplate({
    template: "Generate a high-converting WhatsApp marketing copy for: {topic}. Focus on benefits and include a clear call to action.",
    inputVariables: ["topic"],
  }),
  ctaGenerator: new PromptTemplate({
    template: "Generate 5 different call-to-action (CTA) lines for a WhatsApp message about: {topic}. Make them short and persuasive.",
    inputVariables: ["topic"],
  }),
  messagePersonalizer: new PromptTemplate({
    template: "Personalize this message: '{message}' for a user named {name} from {city} who interested in {product}. Make it feel personal and warm.",
    inputVariables: ["message", "name", "city", "product"],
  }),
};

/**
 * AI Service Manager
 * Handles template rendering and provider execution
 */
export const aiService = {
  async generate(templateName: keyof typeof AI_TEMPLATES, options: GenerationOptions) {
    const template = AI_TEMPLATES[templateName];
    if (!template) {
      throw new Error(`Template '${templateName}' not found`);
    }
    try {
      const timeoutPromise = new Promise<string>((_, reject) => {
        setTimeout(() => reject(new Error('Provider timeout exceeded')), 3000);
      });

      const result = await Promise.race([
        activeProvider.generate(template as any, options),
        timeoutPromise
      ]);

      return result;
    } catch (error) {
      console.warn(`Primary provider failed or timed out: ${error instanceof Error ? error.message : String(error)}. Switching to Fallback Provider.`);
      
      try {
         return await providers.llamaFallback.generate(template as any, options);
      } catch (fallbackError) {
         console.error('Fallback provider also failed:', fallbackError);
         throw new Error('All AI providers are currently experiencing issues. Please try again later.');
      }
    }
  }
};
