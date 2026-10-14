'use client';
import React, { useEffect, useRef } from 'react';
import type { Canvas } from 'fabric';
import { useStudioStore } from '@/store/useStudioStore';
import {
  HEART_PATH,
  addBackground,
  createClipPath,
  deleteSelected,
  setDrawingMode,
  readActiveText,
} from '@/lib/studioActions';

export function StudioCanvas() {
  const elRef = useRef<HTMLCanvasElement>(null);
  const canvas = useStudioStore((s) => s.canvas);
  const { shape, size, bleed } = useStudioStore((s) => s.canvasConfig);
  const selectedTool = useStudioStore((s) => s.selectedTool);
  const brushColor = useStudioStore((s) => s.brushColor);
  const brushSize = useStudioStore((s) => s.brushSize);
  const total = size + bleed * 2;

  // 1. Buat canvas Fabric
  useEffect(() => {
    let disposed = false;
    let instance: Canvas | null = null;

    (async () => {
      const { Canvas } = await import('fabric');
      if (disposed || !elRef.current) return;

      const c = new Canvas(elRef.current, {
        width: total,
        height: total,
        preserveObjectStacking: true,
      });
      instance = c;

      c.clipPath = await createClipPath(shape, total);
      await addBackground(c, useStudioStore.getState().bgColor, total);
      if (disposed) {
        c.dispose();
        return;
      }

    const { setHasSelection, setCanvas, setActiveText } = useStudioStore.getState();
        const sync = () => setActiveText(readActiveText(c));
        c.on('selection:created', () => { setHasSelection(true); sync(); });
        c.on('selection:updated', () => { setHasSelection(true); sync(); });
        c.on('selection:cleared', () => { setHasSelection(false); setActiveText(null); });
        c.on('text:changed', sync);

      c.requestRenderAll();
      setCanvas(c);
    })();

    return () => {
      disposed = true;
      const { setCanvas, setHasSelection, setActiveText } = useStudioStore.getState();
      setActiveText(null);
      setCanvas(null);
      setHasSelection(false);
      instance?.dispose();
    };
  }, [shape, size, bleed, total]);

  // 2. Sinkronkan mode coret-coret dengan tool & warna kuas
  useEffect(() => {
    if (!canvas) return;
    setDrawingMode(canvas, selectedTool === 'draw', brushColor, brushSize);
  }, [canvas, selectedTool, brushColor, brushSize]);

  // 3. Tombol Delete / Backspace menghapus objek terpilih
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Delete' && e.key !== 'Backspace') return;
      const target = e.target as HTMLElement | null;
      if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return;
      const c = useStudioStore.getState().canvas;
      if (!c) return;
      const active = c.getActiveObject() as unknown as { isEditing?: boolean } | undefined;
      if (active?.isEditing) return;
      e.preventDefault();
      deleteSelected(c);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const inner = total - bleed * 2;
  const cutStyle = {
    fill: 'none',
    stroke: 'var(--color-peach-deep, #FF8A65)',
    strokeWidth: 2,
    strokeDasharray: '8 6',
  } as const;

  return (
    <div
      className="relative shrink-0 rounded-[20px] border-[1.5px] border-[var(--color-border-warm)] shadow-[var(--shadow-sticker)]"
      style={{
        width: total,
        height: total,
        backgroundImage:
          'conic-gradient(#f6ebe2 25%, #ffffff 0 50%, #f6ebe2 0 75%, #ffffff 0)',
        backgroundSize: '20px 20px',
      }}
    >
      <canvas ref={elRef} />
      {/* Garis potong (putus-putus). Area antara garis ini dan tepi adalah bleed. */}
      <svg
        width={total}
        height={total}
        viewBox={`0 0 ${total} ${total}`}
        className="absolute inset-0 pointer-events-none"
      >
        {shape === 'round' && <circle cx={total / 2} cy={total / 2} r={inner / 2} style={cutStyle} />}
        {shape === 'square' && (
          <rect x={bleed} y={bleed} width={inner} height={inner} rx={inner * 0.08} style={cutStyle} />
        )}
        {shape === 'heart' && (
          <path
            d={HEART_PATH}
            transform={`translate(${bleed} ${bleed + (inner - 0.9 * inner) / 2}) scale(${inner / 100})`}
            style={{ ...cutStyle, strokeWidth: 2 / (inner / 100) }}
          />
        )}
      </svg>
    </div>
  );
}