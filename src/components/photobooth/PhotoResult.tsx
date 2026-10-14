'use client';
import React, { useState } from 'react';
import { useStudioStore } from '@/store/useStudioStore';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import {
  composePhotos,
  canvasToBlob,
  saveBlob,
  canShareFile,
  shareBlob,
  PhotoLayout,
} from '@/lib/composePhotos';

interface PhotoResultProps {
  photos: string[];
  layout: PhotoLayout;
  onRetake: () => void;
}

export function PhotoResult({ photos, layout, onRetake }: PhotoResultProps) {
  const router = useRouter();
  const { addLayer, setSetupComplete } = useStudioStore();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const buildBlob = async () => {
    const canvas = await composePhotos(photos, layout);
    return canvasToBlob(canvas);
  };

  const handleDownload = async () => {
    if (photos.length === 0) return;
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      const blob = await buildBlob();
      const result = await saveBlob(blob, `paper-and-peach-${Date.now()}.png`);
      if (result === 'saved') setNotice('Yay! Fotomu sudah tersimpan ✨');
      if (result === 'downloaded') setNotice('Fotomu sudah diunduh. Cek folder Downloads ya ✨');
    } catch {
      setError('Fotonya belum bisa diunduh. Coba lagi ya 🍑');
    } finally {
      setBusy(false);
    }
  };

  const handleShare = async () => {
    if (photos.length === 0) return;
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      const blob = await buildBlob();
      const filename = `paper-and-peach-${Date.now()}.png`;
      if (canShareFile(blob, filename)) {
        await shareBlob(blob, filename);
      } else {
        await saveBlob(blob, filename);
      }
    } catch {
      setError('Fotonya belum bisa dibagikan. Coba lagi ya 🍑');
    } finally {
      setBusy(false);
    }
  };

  const handleSendToStudio = async () => {
    if (photos.length === 0) return;
    setBusy(true);
    setError(null);
    try {
      const canvas = await composePhotos(photos, layout);
      const width = 300;
      const height = Math.round((canvas.height / canvas.width) * width);

      addLayer({
        id: `photo-${Date.now()}`,
        type: 'image',
        x: 0,
        y: 0,
        width,
        height,
        rotation: 0,
        src: canvas.toDataURL('image/png'),
      });
      setSetupComplete(true);
      router.push('/studio');
    } catch {
      setError('Fotonya belum bisa dikirim ke Design Studio. Coba lagi ya 🍑');
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-col items-center bg-[var(--color-paper)] p-6 rounded-[28px] border-[1.5px] border-[var(--color-border-warm)] shadow-[var(--shadow-sticker)]">
      <h3 className="font-heading font-bold text-xl text-[var(--color-cocoa)] mb-6">Your Photos</h3>

      <div className="flex gap-4 mb-8 max-w-full overflow-x-auto p-4">
        {photos.map((src, i) => (
          <div key={i} className="shrink-0 flex flex-col items-center gap-2">
            <div className="w-32 md:w-48 aspect-[3/4] bg-white p-2 pb-8 rounded-sm shadow-md border-[1px] border-[var(--color-border-warm)] transform rotate-2">
              <img src={src} alt={`Capture ${i + 1}`} className="w-full h-full object-cover" />
            </div>
            {/* Simpan satu foto saja */}
            <a
              href={src}
              download={`paper-and-peach-foto-${i + 1}.png`}
              className="text-sm font-semibold text-[var(--color-peach-deep)] underline"
            >
              Simpan foto {i + 1}
            </a>
          </div>
        ))}
      </div>

      {error && (
        <p role="alert" className="mb-3 text-sm text-[var(--color-berry)]">
          {error}
        </p>
      )}
      {notice && (
        <p role="status" className="mb-3 text-sm text-[var(--color-mint-deep)]">
          {notice}
        </p>
      )}

      <div className="flex flex-col w-full gap-3">
        <Button variant="primary" className="w-full" onClick={handleDownload} disabled={busy}>
          {busy ? 'Menyiapkan...' : 'Download / Simpan ke Folder'}
        </Button>
        <Button variant="secondary" className="w-full" onClick={handleShare} disabled={busy}>
          Bagikan
        </Button>
        <Button variant="primary" className="w-full" onClick={handleSendToStudio} disabled={busy}>
          Send to Design Studio
        </Button>
        <Button variant="secondary" className="w-full" onClick={onRetake} disabled={busy}>
          Retake Photos
        </Button>
      </div>
    </div>
  );
}