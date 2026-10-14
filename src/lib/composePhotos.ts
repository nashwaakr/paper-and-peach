export type PhotoLayout = 'single' | 'strip-3' | 'strip-4' | 'grid-4';

const CELL_W = 600;
const CELL_H = 800; // rasio 3:4, sama seperti kartu hasil
const PAD = 40;
const FOOTER = 110;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// Gambar foto ke sel dengan crop tengah (seperti object-cover)
function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number
) {
  const targetRatio = w / h;
  const imgRatio = img.width / img.height;
  let sx = 0, sy = 0, sw = img.width, sh = img.height;

  if (imgRatio > targetRatio) {
    sw = img.height * targetRatio;
    sx = (img.width - sw) / 2;
  } else {
    sh = img.width / targetRatio;
    sy = (img.height - sh) / 2;
  }
  ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
}

export async function composePhotos(
  photos: string[],
  layout: PhotoLayout
): Promise<HTMLCanvasElement> {
  const imgs = await Promise.all(photos.map(loadImage));

  const cols = layout === 'grid-4' ? 2 : 1;
  const rows = Math.ceil(imgs.length / cols);

  const width = PAD + cols * (CELL_W + PAD);
  const height = PAD + rows * (CELL_H + PAD) + FOOTER;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#FFF6EC'; // Cream
  ctx.fillRect(0, 0, width, height);

  imgs.forEach((img, i) => {
    const x = PAD + (i % cols) * (CELL_W + PAD);
    const y = PAD + Math.floor(i / cols) * (CELL_H + PAD);

    // border putih ala sticker
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(x - 8, y - 8, CELL_W + 16, CELL_H + 16);
    drawCover(ctx, img, x, y, CELL_W, CELL_H);
  });

  ctx.fillStyle = '#4A2C2A'; // Cocoa Brown
  ctx.font = '48px Caveat, cursive';
  ctx.textAlign = 'center';
  ctx.fillText('Paper and Peach', width / 2, height - 45);

  return canvas;
}

export function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('toBlob gagal'))),
      'image/png'
    );
  });
}

function anchorDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export type SaveResult = 'saved' | 'downloaded' | 'cancelled';

// Simpan langsung ke folder pilihan user bila browser mendukung,
// kalau tidak, unduhan biasa.
export async function saveBlob(blob: Blob, filename: string): Promise<SaveResult> {
  const picker = (window as any).showSaveFilePicker;
  if (typeof picker === 'function') {
    try {
      const handle = await picker({
        suggestedName: filename,
        types: [{ description: 'Gambar PNG', accept: { 'image/png': ['.png'] } }],
      });
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      return 'saved';
    } catch (e: any) {
      if (e?.name === 'AbortError') return 'cancelled'; // user menutup dialog
      // error lain (mis. diblokir): lanjut ke unduhan biasa
    }
  }
  anchorDownload(blob, filename);
  return 'downloaded';
}

// Menu bagikan bawaan HP (ada opsi simpan ke galeri/file)
export function canShareFile(blob: Blob, filename: string): boolean {
  if (typeof navigator === 'undefined' || !navigator.canShare) return false;
  const file = new File([blob], filename, { type: 'image/png' });
  return navigator.canShare({ files: [file] });
}

export async function shareBlob(blob: Blob, filename: string) {
  const file = new File([blob], filename, { type: 'image/png' });
  try {
    await navigator.share({ files: [file], title: 'Paper and Peach' });
  } catch (e: any) {
    if (e?.name !== 'AbortError') throw e;
  }
}