import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';
import { ReadableStream, TransformStream } from 'node:stream/web';
import fetch from 'node-fetch';

(global as any).fetch = fetch;
(global as any).Request = (fetch as any).Request;
(global as any).Response = (fetch as any).Response;
(global as any).Headers = (fetch as any).Headers;
global.TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;
(global as any).ReadableStream = ReadableStream;
(global as any).TransformStream = TransformStream;
process.env.GROQ_API_KEY = 'gsk_dummy_key_for_testing';
