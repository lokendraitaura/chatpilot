import { ChatGroq } from "@langchain/groq";
import { PromptTemplate } from "@langchain/core/prompts";
import { BaseAIProvider } from "./base";
import { GenerationOptions } from "../types";

export class GroqProvider extends BaseAIProvider {
  name = "groq";
  private model: ChatGroq;

  constructor() {
    super();
    this.model = new ChatGroq({
      apiKey: process.env.GROQ_API_KEY,
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
    });
  }

  async generate(template: PromptTemplate<any, any>, options: GenerationOptions): Promise<string> {
    const chain = template.pipe(this.model).pipe(this.parser);
    const result = await chain.invoke(options);
    return result as string;
  }
}
