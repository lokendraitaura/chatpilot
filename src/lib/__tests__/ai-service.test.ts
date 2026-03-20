jest.mock('../ai/providers/groq');
import { aiService } from '../ai-service';
import { GroqProvider } from '../ai/providers/groq';

describe('AIService Manager', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call generate on the active provider', async () => {
    const mockGenerate = jest.spyOn(GroqProvider.prototype, 'generate').mockResolvedValue('Mocked AI Response');

    const result = await aiService.generate('messageGenerator', { prompt: 'hello' });
    
    expect(result).toBe('Mocked AI Response');
    expect(mockGenerate).toHaveBeenCalled();
    
    mockGenerate.mockRestore();
  });

  it('should handle provider errors gracefully', async () => {
    const mockGenerate = jest.spyOn(GroqProvider.prototype, 'generate').mockRejectedValue(new Error('API Error'));

    await expect(aiService.generate('messageGenerator', { prompt: 'hello' })).rejects.toThrow('API Error');
    
    mockGenerate.mockRestore();
  });
});
