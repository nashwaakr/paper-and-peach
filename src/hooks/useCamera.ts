import { useState, useEffect, useRef, useCallback } from 'react';

export function useCamera() {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isFacingUser, setIsFacingUser] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null); // selalu berisi stream terbaru
  const mountedRef = useRef(true);

  const releaseStream = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  };

  const startCamera = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setError('Your browser does not support camera access. Please try the latest Chrome or Safari.');
      return;
    }

    // Hentikan stream lama lewat ref (bukan state yang bisa basi)
    releaseStream();

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: isFacingUser ? 'user' : 'environment',
          width: { ideal: 1280 },
          height: { ideal: 960 },
        },
        audio: false,
      });

      // Komponen sudah di-unmount saat menunggu izin kamera
      if (!mountedRef.current) {
        mediaStream.getTracks().forEach((t) => t.stop());
        return;
      }

      streamRef.current = mediaStream;
      setStream(mediaStream);
      setError(null);
    } catch (err: any) {
      console.error('Camera error:', err);
      if (err.name === 'NotAllowedError') {
        setError('Camera permission denied. Please allow camera access in your browser settings.');
      } else if (err.name === 'NotFoundError') {
        setError('No camera found on this device.');
      } else {
        setError('An error occurred while accessing the camera.');
      }
    }
  }, [isFacingUser]);

  const stopCamera = useCallback(() => {
    releaseStream();
    setStream(null);
  }, []);

  const toggleCamera = useCallback(() => {
    setIsFacingUser((prev) => !prev);
  }, []);

  // Hubungkan stream ke <video> setelah elemennya benar-benar dirender
  useEffect(() => {
    const video = videoRef.current;
    if (video && stream) {
      video.srcObject = stream;
      video.play().catch(() => {});
    }
  }, [stream]);

  // Cleanup hanya saat unmount
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      releaseStream();
    };
  }, []);

  return {
    videoRef,
    stream,
    error,
    isFacingUser,
    startCamera,
    stopCamera,
    toggleCamera,
  };
}