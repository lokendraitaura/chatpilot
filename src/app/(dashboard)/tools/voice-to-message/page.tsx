'use client';

import { useState, useRef, useEffect } from 'react';
import { Mic, Square, Copy, RefreshCw, Volume2, Mic2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useCopy } from '@/hooks/useCopy';

export default function VoiceToMessage() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const { copied, copy } = useCopy();

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Logic for starting recording
    } else {
      // Logic for stopping recording and generating transcript (mock)
      setTranscript("Hello! This is an AI-generated transcript from your voice message. You can now edit it and send it via WhatsApp.");
    }
  };

  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-16 h-16 mx-auto rounded-2xl gradient-primary flex items-center justify-center mb-6"
        >
          <Mic className="w-8 h-8 text-white" />
        </motion.div>
        <h1 className="text-4xl font-bold">Voice to Message</h1>
        <p className="text-lg text-muted-foreground">Speak your mind and let our AI turn it into a perfect WhatsApp message instantly.</p>
      </div>

      <div className="flex flex-col items-center space-y-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleRecording}
          className={`w-32 h-32 rounded-full flex items-center justify-center shadow-2xl transition-all ${
            isRecording ? 'bg-red-500 animate-pulse text-white' : 'bg-[var(--primary)] text-white'
          }`}
        >
          {isRecording ? <Square className="w-12 h-12" /> : <Mic className="w-12 h-12" />}
        </motion.button>
        <p className="font-bold text-sm uppercase tracking-widest text-muted-foreground">
          {isRecording ? 'Recording... Tap to Stop' : 'Tap to Start Speaking'}
        </p>
      </div>

      <AnimatePresence>
        {transcript && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-3xl p-8 shadow-sm space-y-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-[var(--primary)]" />
                Transcript
              </h3>
              <Button
                variant={copied ? 'secondary' : 'outline'}
                size="sm"
                onClick={() => copy(transcript)}
                leftIcon={copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              >
                {copied ? 'Copied' : 'Copy'}
              </Button>
            </div>
            <textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              className="w-full min-h-[150px] bg-muted/30 rounded-2xl p-6 outline-none border border-transparent focus:border-[var(--primary)] transition-all text-base leading-relaxed"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
