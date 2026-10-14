'use client';
import React from 'react';
import { useStudioStore } from '@/store/useStudioStore';
import { Button } from '@/components/ui/Button';

export function PropertiesPanel() {
  const { selectedLayerId, layers } = useStudioStore();
  
  const activeLayer = layers.find(l => l.id === selectedLayerId);

  return (
    <div className="w-72 bg-[var(--color-paper)] border-l-[1.5px] border-[var(--color-border-warm)] p-6 flex flex-col h-full overflow-y-auto">
      <h3 className="font-heading font-bold text-lg text-[var(--color-cocoa)] mb-6">
        Properties
      </h3>
      
      {!activeLayer ? (
        <div className="text-center text-sm text-[var(--color-cocoa-70)] mt-10">
          Select an element on the canvas to edit its properties.
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-[var(--color-cocoa-70)] uppercase tracking-wider">
              Type
            </span>
            <span className="capitalize font-semibold text-[var(--color-cocoa)]">
              {activeLayer.type} Element
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[var(--color-cocoa-70)]">X</label>
              <input type="number" value={Math.round(activeLayer.x)} readOnly className="w-full bg-[var(--color-cream)] p-2 rounded-lg text-sm border-[1.5px] border-[var(--color-border-warm)]" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[var(--color-cocoa-70)]">Y</label>
              <input type="number" value={Math.round(activeLayer.y)} readOnly className="w-full bg-[var(--color-cream)] p-2 rounded-lg text-sm border-[1.5px] border-[var(--color-border-warm)]" />
            </div>
          </div>
          
          {/* Mock filters for images */}
          {activeLayer.type === 'image' && (
            <div className="flex flex-col gap-3">
              <label className="text-sm font-semibold text-[var(--color-cocoa)]">Filters</label>
              <Button variant="secondary" size="sm">Brightness / Contrast</Button>
              <Button variant="secondary" size="sm">Black & White</Button>
            </div>
          )}
          
          <div className="mt-auto pt-6 border-t-[1.5px] border-[var(--color-border-warm)]">
            <Button variant="danger" className="w-full">
              Delete Element
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
