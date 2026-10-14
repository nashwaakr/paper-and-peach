'use client';
import React, { useEffect, useState } from 'react';
import { Camera, FlipHorizontal, SwitchCamera } from 'lucide-react';
import { useCamera } from '@/hooks/useCamera';
import { Button } from '@/components/ui/Button';

interface CameraPreviewProps {
  filter: string;
  onCapture: (imageSrc: string) => void;
}

export function CameraPreview({ filter, onCapture }: CameraPreviewProps) {
  const { videoRef, stream, error, isFacingUser, startCamera, toggleCamera } = useCamera();
  const [countdown, setCountdown] = useState<number | null>(null);
  const [flash, setFlash] = useState(false);
  const [mirror, setMirror] = useState(true);

  useEffect(() => {
    startCamera();
  }, [startCamera]);

  // Kamera depan: mirror otomatis aktif. Kamera belakang: nonaktif.
  // User tetap bisa mengubahnya lewat tombol.
  useEffect(() => {
    setMirror(isFacingUser);
  }, [isFacingUser]);

  const handleCaptureClick = () => {
    if (!stream) return;

    let count = 3;
    setCountdown(count);

    const timer = setInterval(() => {
      count -= 1;
      if (count > 0) {
        setCountdown(count);
      } else {
        clearInterval(timer);
        setCountdown(null);
        takePhoto();
      }
    }, 1000);
  };

  const takePhoto = () => {
    const video = videoRef.current;
    if (!video || video.videoWidth === 0) return;

    setFlash(true);
    setTimeout(() => setFlash(false), 150);

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Filter diterapkan langsung dari string CSS yang sama dengan preview
    ctx.filter = filter && filter !== 'none' ? filter : 'none';

    // Mirror memakai state yang sama dengan preview
    if (mirror) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    onCapture(canvas.toDataURL('image/png'));
  };

  if (error) {
    return (
      <div className="w-full aspect-[3/4] md:aspect-video bg-[var(--color-cream)] rounded-[28px] border-[4px] border-white flex flex-col items-center justify-center p-8 text-center shadow-[var(--shadow-sticker)]">
        <div className="w-16 h-16 bg-[var(--color-paper)] rounded-full flex items-center justify-center mb-4">
          <Camera className="w-8 h-8 text-[var(--color-berry)]" />
        </div>
        <h3 className="font-heading font-bold text-lg text-[var(--color-cocoa)] mb-2">Camera Access Needed</h3>
        <p className="text-[var(--color-cocoa-70)] mb-6 text-sm">{error}</p>
        <Button variant="primary" onClick={startCamera}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-[3/4] md:aspect-video bg-black rounded-[28px] border-[4px] border-white overflow-hidden shadow-[var(--shadow-sticker)]">
      {flash && <div className="absolute inset-0 bg-white z-50 opacity-80" />}

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover"
        style={{
          transform: mirror ? 'scaleX(-1)' : 'scaleX(1)',
          filter: filter,
        }}
      />

      {countdown !== null && (
        <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/20">
          <span
            className="text-8xl md:text-[150px] font-heading font-bold text-[var(--color-peach)] animate-ping"
            style={{ WebkitTextStroke: '4px white' }}
          >
            {countdown}
          </span>
        </div>
      )}

      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center px-6 gap-6 z-30">
        <button
          onClick={toggleCamera}
          aria-label="Ganti kamera"
          className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors"
        >
          <SwitchCamera className="w-6 h-6" />
        </button>

        <button
          onClick={handleCaptureClick}
          disabled={countdown !== null || !stream}
          aria-label="Ambil foto"
          className="w-20 h-20 bg-white rounded-full flex items-center justify-center border-[4px] border-[var(--color-peach-deep)] shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
        >
          <div className="w-16 h-16 bg-[var(--color-peach)] rounded-full" />
        </button>

        <button
          onClick={() => setMirror((m) => !m)}
          aria-label={mirror ? 'Matikan mirror' : 'Aktifkan mirror'}
          aria-pressed={mirror}
          className={`w-12 h-12 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors ${
            mirror ? 'bg-[var(--color-peach-deep)]' : 'bg-white/20 hover:bg-white/40'
          }`}
        >
          <FlipHorizontal className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}