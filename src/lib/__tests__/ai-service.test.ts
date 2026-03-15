jest.mock('../ai/providers/groq');
import { aiService } from '../ai-service';
import { GroqProvider } from '../ai/providers/groq';

describe('AIService Manager', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call generate on the active provider', async () => {
    const mockGenerate = jest.spyOn(GroqProvider.prototype, 'generate').mockResolvedValue({
      success: true,
      data: 'Mocked AI Response',
    });

    const result = await aiService.generate('messageGenerator', { prompt: 'hello' });
    
    expect(result.success).toBe(true);
    expect(result.data).toBe('Mocked AI Response');
    expect(mockGenerate).toHaveBeenCalled();
    
    mockGenerate.mockRestore();
  });

  it('should handle provider errors gracefully', async () => {
    const mockGenerate = jest.spyOn(GroqProvider.prototype, 'generate').mockResolvedValue({
      success: false,
      error: 'API Error',
    });

    const result = await aiService.generate('messageGenerator', { prompt: 'hello' });
    
    expect(result.success).toBe(false);
    expect(result.error).toBe('API Error');
    
    mockGenerate.mockRestore();
  });
});
