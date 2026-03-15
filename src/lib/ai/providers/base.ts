import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { AIProvider, GenerationOptions } from "../types";

export abstract class BaseAIProvider implements AIProvider {
  abstract name: string;
  protected parser = new StringOutputParser();

  abstract generate(template: PromptTemplate<any, any>, options: GenerationOptions): Promise<string>;
}
