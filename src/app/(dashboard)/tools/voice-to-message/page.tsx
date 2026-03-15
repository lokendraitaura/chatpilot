'use client';

import { useState, useRef, useEffect } from 'react';
import { Mic, Square, Copy, RefreshCw, Volume2, Mic2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
// DashboardLayout removed - handled by (dashboard)/layout.tsx

export default function VoiceToMessage() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  
  // Use 'any' type to handle browser specific speech recognition implementations
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (!SpeechRecognition) {
        setIsSupported(false);
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      
      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleRecording = () => {
    if (!isSupported) return;

    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      setTranscript('');
      recognitionRef.current?.start();
      setIsRecording(true);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(transcript);
  };

  return (
    <div className="space-y-8">
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 mx-auto rounded-2xl gradient-primary flex items-center justify-center mb-6"
          >
            <Mic2 className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold">Voice to Message</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert your spoken words into text instantly for your WhatsApp messages.
          </p>
        </div>

        {!isSupported && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl mx-auto p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-bold text-center"
          >
            Speech Recognition is not supported in this browser. Please use Chrome or Edge.
          </motion.div>
        )}

        <div className="max-w-3xl mx-auto w-full space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-sm text-center space-y-8"
          >
            <div className="relative inline-block">
              <AnimatePresence>
                {isRecording && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.5, opacity: 1 }}
                    exit={{ scale: 2, opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="absolute inset-0 bg-[var(--primary)]/20 rounded-full"
                  />
                )}
              </AnimatePresence>
              <button
                onClick={toggleRecording}
                disabled={!isSupported}
                className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-xl cursor-pointer active:scale-95 ${
                  isRecording 
                    ? 'bg-red-500 text-white shadow-red-500/20' 
                    : 'gradient-primary text-white shadow-[var(--primary)]/20 hover:scale-105'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isRecording ? <Square className="w-8 h-8" /> : <Mic className="w-10 h-10" />}
              </button>
            </div>
            
            <div className="space-y-2">
              <p className={`text-xl font-bold ${isRecording ? 'text-red-500' : 'text-foreground'}`}>
                {isRecording ? 'Listening...' : 'Ready to listen'}
              </p>
              <p className="text-sm text-muted-foreground">
                {isRecording ? 'Speak clearly into your microphone' : 'Click the microphone to start transcribing'}
              </p>
            </div>
          </motion.div>

          <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-muted-foreground uppercase flex items-center gap-2">
                <RefreshCw className={`w-4 h-4 ${isRecording ? 'animate-spin' : ''}`} />
                Transcription
              </h2>
              {transcript && (
                <button
                  onClick={() => setTranscript('')}
                  className="text-xs font-bold text-destructive hover:underline cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>
            
            <div className="relative group">
              <textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Spoken text appears here..."
                className="w-full min-h-[200px] p-6 rounded-2xl border-2 border-border focus:border-[var(--primary)] bg-background outline-none transition-all resize-none text-lg leading-relaxed font-medium"
              />
            </div>

            <button
              onClick={copyToClipboard}
              disabled={!transcript}
              className="w-full py-4 rounded-2xl gradient-primary text-white font-bold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2 shadow-lg shadow-[var(--primary)]/20 cursor-pointer"
            >
              <Copy className="w-5 h-5" />
              <span>Copy Transcription</span>
            </button>
          </div>
        </div>
      </div>
  );
}
