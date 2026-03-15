import { NextRequest } from 'next/server';
import { POST } from '../ai/message-generator/route';
import { aiService } from '@/lib/ai-service';

// Mock the AI Service
jest.mock('@/lib/ai-service', () => ({
  aiService: {
    generate: jest.fn(),
  },
}));

// Mock next/server
jest.mock('next/server', () => {
  return {
    NextRequest: class {
      url: string;
      body: string;
      constructor(url: string, init: any) {
        this.url = url;
        this.body = init.body;
      }
      async json() {
        return JSON.parse(this.body);
      }
    },
    NextResponse: {
      json: (body: any, init?: any) => ({
        json: async () => body,
        status: init?.status || 200,
      }),
    },
  };
});

describe('AI API Routes Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/ai/message-generator', () => {
    it('should return 400 if prompt is missing', async () => {
      const req = new NextRequest('http://localhost:3000/api/ai/message-generator', {
        method: 'POST',
        body: JSON.stringify({}),
      });

      const response: any = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Prompt is required');
    });

    it('should return successfully generated message', async () => {
      (aiService.generate as jest.Mock).mockResolvedValue('Hello, this is a generated message');

      const req = new NextRequest('http://localhost:3000/api/ai/message-generator', {
        method: 'POST',
        body: JSON.stringify({ prompt: 'test prompt' }),
      });

      const response: any = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toBe('Hello, this is a generated message');
      expect(aiService.generate).toHaveBeenCalledWith('messageGenerator', { prompt: 'test prompt' });
    });

    it('should return 500 if AI service fails', async () => {
      (aiService.generate as jest.Mock).mockRejectedValue(new Error('AI Service Down'));

      const req = new NextRequest('http://localhost:3000/api/ai/message-generator', {
        method: 'POST',
        body: JSON.stringify({ prompt: 'test prompt' }),
      });

      const response: any = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.error).toBe('AI Service Down');
    });
  });
});
