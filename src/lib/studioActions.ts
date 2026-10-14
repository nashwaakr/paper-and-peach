import type { Canvas, FabricObject, IText } from 'fabric';
import type { StickerShape } from '@/store/useStudioStore';
import type { ActiveText } from '@/store/useStudioStore';

/**
 * Semua operasi Fabric.js ada di sini.
 * Fabric di-import secara dinamis supaya tidak ikut dirender di server Next.js.
 */
const loadFabric = () => import('fabric');

// Bentuk hati dalam kotak 100 x 90
export const HEART_PATH =
  'M50 90 C10 60 0 35 0 25 C0 8 12 0 25 0 C37 0 46 7 50 15 C54 7 63 0 75 0 C88 0 100 8 100 25 C100 35 90 60 50 90 Z';

/** Bentuk stiker: apa pun yang digambar hanya terlihat di dalam bentuk ini. */
/** Bentuk stiker: apa pun yang digambar hanya terlihat di dalam bentuk ini. */
export async function createClipPath(shape: StickerShape, total: number) {
  const { Circle, Rect, Path } = await loadFabric();
  const center = {
    left: total / 2,
    top: total / 2,
    originX: 'center' as const,
    originY: 'center' as const,
    absolutePositioned: true,
  };
  if (shape === 'round') {
    return new Circle({ ...center, radius: total / 2 });
  }
  if (shape === 'square') {
    return new Rect({
      ...center,
      width: total,
      height: total,
      rx: total * 0.08,
      ry: total * 0.08,
    });
  }
  const s = total / 100;
  return new Path(HEART_PATH, { ...center, scaleX: s, scaleY: s });
}

/** Latar stiker. Selalu menjadi objek pertama (index 0) di canvas. */
export async function addBackground(canvas: Canvas, color: string, total: number) {
  const { Rect } = await loadFabric();
  const bg = new Rect({
    left: total / 2,
    top: total / 2,
    originX: 'center',
    originY: 'center',
    width: total,
    height: total,
    fill: color,
    selectable: false,
    evented: false,
    hoverCursor: 'default',
  });
  canvas.add(bg);
}

export function setBackground(canvas: Canvas, color: string) {
  const bg = canvas.getObjects()[0];
  if (bg) {
    bg.set('fill', color);
    canvas.requestRenderAll();
  }
}

/** Upload gambar dari file, lalu taruh di tengah canvas. */
export async function addImageFromUrl(canvas: Canvas, url: string) {
  const { FabricImage } = await loadFabric();
  const img = await FabricImage.fromURL(url, { crossOrigin: 'anonymous' });
  const scale = Math.min(
    (canvas.getWidth() * 0.7) / (img.width || 1),
    (canvas.getHeight() * 0.7) / (img.height || 1),
    1
  );
  img.scale(scale);
  canvas.add(img);
  canvas.centerObject(img);
  canvas.setActiveObject(img);
  canvas.requestRenderAll();
}

export async function addImageFromFile(canvas: Canvas, file: File) {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
  await addImageFromUrl(canvas, dataUrl);
}

export async function addText(
  canvas: Canvas,
  opts: { text: string; color: string; fontFamily: string; fontSize: number }
) {
  const { IText } = await loadFabric();
  const t = new IText(opts.text.trim() || 'Your text', {
    left: canvas.getWidth() / 2,
    top: canvas.getHeight() / 2,
    originX: 'center',
    originY: 'center',
    fill: opts.color,
    fontFamily: opts.fontFamily,
    fontSize: opts.fontSize,
    fontWeight: 'bold',
  });
  canvas.add(t);
  canvas.setActiveObject(t);
  canvas.requestRenderAll();
}

export type ElementKind = 'circle' | 'square' | 'triangle' | 'heart' | 'star';

export async function addShape(canvas: Canvas, kind: ElementKind, color: string) {
  const f = await loadFabric();
  const base = {
    fill: color,
    originX: 'center' as const,
    originY: 'center' as const,
    left: canvas.getWidth() / 2,
    top: canvas.getHeight() / 2,
  };
  let obj: FabricObject;
  switch (kind) {
    case 'circle':
      obj = new f.Circle({ ...base, radius: 60 });
      break;
    case 'square':
      obj = new f.Rect({ ...base, width: 120, height: 120, rx: 12, ry: 12 });
      break;
    case 'triangle':
      obj = new f.Triangle({ ...base, width: 130, height: 115 });
      break;
    case 'heart':
      obj = new f.Path(HEART_PATH, { ...base, scaleX: 1.4, scaleY: 1.4 });
      break;
    case 'star': {
      const pts = Array.from({ length: 10 }, (_, i) => {
        const r = i % 2 === 0 ? 62 : 26;
        const a = -Math.PI / 2 + (i * Math.PI) / 5;
        return { x: r * Math.cos(a), y: r * Math.sin(a) };
      });
      obj = new f.Polygon(pts, base);
      break;
    }
  }
  canvas.add(obj);
  canvas.setActiveObject(obj);
  canvas.requestRenderAll();
}

/** Ganti warna objek terpilih (teks, bentuk, atau coretan). Gambar tidak diubah. */
export function applyColorToSelection(canvas: Canvas, color: string) {
  canvas.getActiveObjects().forEach((o) => {
    if (o.type?.toLowerCase() === 'image') return;
    if (o.fill) o.set('fill', color);
    else o.set('stroke', color); // coretan bebas hanya punya stroke
  });
  canvas.requestRenderAll();
}

export function applyTextStyle(
  canvas: Canvas,
  props: { fontFamily?: string; fontSize?: number }
) {
  canvas.getActiveObjects().forEach((o) => {
    if (o.type?.toLowerCase() === 'itext') o.set(props);
  });
  canvas.requestRenderAll();
}

/** Aktifkan / matikan mode coret-coret. */
export async function setDrawingMode(canvas: Canvas, on: boolean, color: string, width: number) {
  const { PencilBrush } = await loadFabric();
  if (on) {
    const brush =
      canvas.freeDrawingBrush instanceof PencilBrush
        ? canvas.freeDrawingBrush
        : new PencilBrush(canvas);
    brush.color = color;
    brush.width = width;
    brush.strokeLineCap = 'round';
    brush.strokeLineJoin = 'round';
    canvas.freeDrawingBrush = brush;
    canvas.discardActiveObject();
  }
  canvas.isDrawingMode = on;
  canvas.requestRenderAll();
}

export function deleteSelected(canvas: Canvas) {
  const active = canvas.getActiveObjects();
  if (!active.length) return;
  active.forEach((o) => canvas.remove(o));
  canvas.discardActiveObject();
  canvas.requestRenderAll();
}

/** Hapus objek paling atas (latar tidak ikut terhapus). */
export function undoLast(canvas: Canvas) {
  const objs = canvas.getObjects();
  if (objs.length <= 1) return;
  canvas.remove(objs[objs.length - 1]);
  canvas.discardActiveObject();
  canvas.requestRenderAll();
}

/** Unduh PNG. Area di luar bentuk stiker transparan. */
export function exportPng(canvas: Canvas, name = 'paper-and-peach-sticker') {
  canvas.discardActiveObject();
  canvas.requestRenderAll();
  const url = canvas.toDataURL({ format: 'png', multiplier: 2, quality: 1 });
  const a = document.createElement('a');
  a.href = url;
  a.download = `${name}.png`;
  a.click();
}

/** Baca data teks yang sedang dipilih di canvas (null jika yang dipilih bukan teks). */
export function readActiveText(canvas: Canvas): ActiveText | null {
  const obj = canvas.getActiveObject();
  if (!obj || obj.type?.toLowerCase() !== 'itext') return null;
  const t = obj as IText;
  return {
    text: t.text ?? '',
    fontFamily: t.fontFamily ?? 'Georgia',
    fontSize: Math.round(t.fontSize ?? 56),
    fill: typeof t.fill === 'string' ? t.fill : '#3B2A20',
  };
}

/** Ganti isi teks yang sedang dipilih. */
export function setActiveTextContent(canvas: Canvas, text: string) {
  const obj = canvas.getActiveObject();
  if (!obj || obj.type?.toLowerCase() !== 'itext') return;
  (obj as IText).set('text', text);
  canvas.requestRenderAll();
}