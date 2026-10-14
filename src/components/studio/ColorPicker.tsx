'use client';
import React from 'react';

const PALETTE = [
  '#3B2A20', '#FFFFFF', '#FFE0CC', '#FFB38A', '#FF8A65', '#E53935', '#F06292', '#AB47BC',
  '#5C6BC0', '#42A5F5', '#26A69A', '#66BB6A', '#FDD835', '#8D6E63',
];

interface Props {
  value: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ value, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      {PALETTE.map((c) => (
        <button
          key={c}
          type="button"
          aria-label={`Color ${c}`}
          onClick={() => onChange(c)}
          style={{ backgroundColor: c }}
          className={`w-8 h-8 rounded-full border-[1.5px] transition-transform ${
            value.toLowerCase() === c.toLowerCase()
              ? 'border-[var(--color-cocoa)] scale-110 ring-2 ring-[var(--color-peach-soft)]'
              : 'border-[var(--color-border-warm)]'
          }`}
        />
      ))}
      <label
        title="Custom color"
        className="relative w-8 h-8 rounded-full border-[1.5px] border-dashed border-[var(--color-cocoa-70)] overflow-hidden cursor-pointer"
        style={{ background: 'conic-gradient(red, yellow, lime, aqua, blue, magenta, red)' }}
      >
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </label>
    </div>
  );
}