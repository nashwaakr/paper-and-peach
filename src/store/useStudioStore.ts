import { create } from 'zustand';
import type { Canvas } from 'fabric';
import { addImageFromUrl } from '@/lib/studioActions';

export type ToolType = 'select' | 'upload' | 'text' | 'draw' | 'elements' | 'photobooth';
export type StickerShape = 'round' | 'square' | 'heart';

export interface CanvasConfig {
  shape: StickerShape;
  size: number; // ukuran area potong (px)
  bleed: number; // margin bleed di setiap sisi (px)
  sizeLabel?: string; // ukuran fisik, mis. "32mm"
}

export interface LayerInput {
  id?: string;
  src?: string;
  url?: string;
  dataUrl?: string;
  image?: string;
  [key: string]: unknown;
}

export interface ActiveText {
  text: string;
  fontFamily: string;
  fontSize: number;
  fill: string;
}

interface StudioState {
  setupComplete: boolean;
  canvasConfig: CanvasConfig;
  selectedTool: ToolType;
  canvas: Canvas | null;
  hasSelection: boolean;
  activeText: ActiveText | null;

  color: string; // warna untuk teks & elemen
  brushColor: string; // warna coretan
  brushSize: number;
  bgColor: string; // warna latar stiker

  setSetupComplete: (v: boolean) => void;
  setCanvasConfig: (c: CanvasConfig) => void;
  setTool: (t: ToolType) => void;
  setCanvas: (c: Canvas | null) => void;
  setHasSelection: (v: boolean) => void;
  setActiveText: (t: ActiveText | null) => void;
  setColor: (c: string) => void;
  setBrushColor: (c: string) => void;
  setBrushSize: (n: number) => void;
  setBgColor: (c: string) => void;

  addLayer: (layer: string | LayerInput) => Promise<void>;
}

export const useStudioStore = create<StudioState>((set, get) => ({
  setupComplete: false,
  canvasConfig: { shape: 'round', size: 500, bleed: 20, sizeLabel: '32mm' },
  selectedTool: 'select',
  canvas: null,
  hasSelection: false,
  activeText: null,

  color: '#3B2A20',
  brushColor: '#FF8A65',
  brushSize: 8,
  bgColor: '#FFFFFF',

  setSetupComplete: (v) => set({ setupComplete: v }),
  setCanvasConfig: (c) => set({ canvasConfig: c }),
  setTool: (t) => set({ selectedTool: t }),
  setCanvas: (c) => set({ canvas: c }),
  setHasSelection: (v) => set({ hasSelection: v }),
  setActiveText: (t) => set({ activeText: t }),
  setColor: (c) => set({ color: c }),
  setBrushColor: (c) => set({ brushColor: c }),
  setBrushSize: (n) => set({ brushSize: n }),
  setBgColor: (c) => set({ bgColor: c }),

  addLayer: async (layer) => {
    const src =
      typeof layer === 'string'
        ? layer
        : layer.src ?? layer.url ?? layer.dataUrl ?? layer.image;
    const canvas = get().canvas;
    if (!canvas || !src) return;
    await addImageFromUrl(canvas, src);
  },
}));