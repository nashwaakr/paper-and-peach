'use client';
import React, { useState } from 'react';
import { useStudioStore, StickerShape } from '@/store/useStudioStore';
import { Button } from '@/components/ui/Button';

export function SetupStep() {
  const { setSetupComplete, setCanvasConfig } = useStudioStore();
  const [shape, setShape] = useState<StickerShape>('round');
  const [size, setSize] = useState('32mm');

  const handleStart = () => {
    setCanvasConfig({ shape, size: 500, bleed: 20, sizeLabel: size });
    setSetupComplete(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="bg-[var(--color-paper)] p-8 rounded-[28px] border-[1.5px] border-[var(--color-border-warm)] max-w-lg w-full shadow-[var(--shadow-sticker)]">
        <h2 className="text-3xl font-heading font-bold text-[var(--color-cocoa)] mb-6 text-center">
          Setup Your Design
        </h2>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-[var(--color-cocoa)] mb-3">
            Choose Shape
          </label>
          <div className="flex gap-4">
            {(['round', 'square', 'heart'] as StickerShape[]).map((s) => (
              <button
                key={s}
                onClick={() => setShape(s)}
                className={`flex-1 py-4 border-[1.5px] rounded-[16px] font-semibold capitalize transition-all ${
                  shape === s
                    ? 'border-[var(--color-peach-deep)] bg-[var(--color-peach-soft)] text-[var(--color-cocoa)]'
                    : 'border-[var(--color-border-warm)] bg-[var(--color-cream)] text-[var(--color-cocoa-70)]'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-semibold text-[var(--color-cocoa)] mb-3">
            Choose Size
          </label>
          <div className="flex gap-4">
            {['25mm', '32mm', '44mm', '58mm'].map((sz) => (
              <button
                key={sz}
                onClick={() => setSize(sz)}
                className={`flex-1 py-3 border-[1.5px] rounded-[16px] font-semibold transition-all ${
                  size === sz
                    ? 'border-[var(--color-peach-deep)] bg-[var(--color-peach-soft)] text-[var(--color-cocoa)]'
                    : 'border-[var(--color-border-warm)] bg-[var(--color-cream)] text-[var(--color-cocoa-70)]'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>

        <Button variant="primary" className="w-full py-4 text-lg" onClick={handleStart}>
          Create Template
        </Button>
      </div>
    </div>
  );
}