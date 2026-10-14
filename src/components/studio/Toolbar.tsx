'use client';
import React from 'react';
import { useStudioStore, ToolType } from '@/store/useStudioStore';
import { MousePointer2, Image as ImageIcon, Type, Pencil, Shapes, Camera } from 'lucide-react';

export function Toolbar() {
  const { selectedTool, setTool } = useStudioStore();

  const tools: { id: ToolType; icon: React.ReactNode; label: string }[] = [
    { id: 'select', icon: <MousePointer2 size={24} />, label: 'Select' },
    { id: 'upload', icon: <ImageIcon size={24} />, label: 'Upload' },
    { id: 'text', icon: <Type size={24} />, label: 'Text' },
    { id: 'draw', icon: <Pencil size={24} />, label: 'Draw' },
    { id: 'elements', icon: <Shapes size={24} />, label: 'Elements' },
    { id: 'photobooth', icon: <Camera size={24} />, label: 'Photobooth' },
  ];

  return (
    <div className="flex flex-col gap-4 w-24 shrink-0 bg-[var(--color-paper)] border-r-[1.5px] border-[var(--color-border-warm)] p-4 items-center">
      {tools.map((t) => (
        <button
          key={t.id}
          onClick={() => setTool(t.id)}
          className={`flex flex-col items-center justify-center w-16 h-16 rounded-[16px] transition-colors ${
            selectedTool === t.id
              ? 'bg-[var(--color-peach-soft)] text-[var(--color-peach-deep)] border-[1.5px] border-[var(--color-peach-deep)]'
              : 'text-[var(--color-cocoa-70)] hover:bg-[var(--color-cream)] hover:text-[var(--color-cocoa)]'
          }`}
        >
          {t.icon}
          <span className="text-[10px] font-semibold mt-1">{t.label}</span>
        </button>
      ))}
    </div>
  );
}