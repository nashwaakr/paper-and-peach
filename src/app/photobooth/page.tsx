'use client';
import React, { useState } from 'react';
import { CameraPreview } from '@/components/photobooth/CameraPreview';
import { PhotoResult } from '@/components/photobooth/PhotoResult';
import { ShieldCheck, Sparkles, Layout } from 'lucide-react';

type LayoutType = 'single' | 'strip-3' | 'strip-4' | 'grid-4';

const FILTERS = [
  { id: 'none', label: 'Normal', css: 'none' },
  { id: 'peach', label: 'Warm Peach', css: 'sepia(50%) hue-rotate(-30deg) saturate(120%)' },
  { id: 'bw', label: 'Black & White', css: 'grayscale(100%)' },
  { id: 'vintage', label: 'Vintage', css: 'contrast(110%) brightness(110%) saturate(130%)' },
];

export default function PhotoboothPage() {
  const [selectedLayout, setSelectedLayout] = useState<LayoutType>('single');
  const [selectedFilter, setSelectedFilter] = useState(FILTERS[0]);
  const [photos, setPhotos] = useState<string[]>([]);
  
  const expectedPhotos = selectedLayout === 'single' ? 1 : selectedLayout === 'strip-3' ? 3 : 4;
  
  const handleCapture = (imageSrc: string) => {
    setPhotos(prev => [...prev, imageSrc]);
  };
  
  const handleRetake = () => {
    setPhotos([]);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-heading font-bold text-[var(--color-cocoa)] mb-2 flex items-center justify-center gap-3">
          <Sparkles className="text-[var(--color-peach-deep)]" />
          Online Photobooth
          <Sparkles className="text-[var(--color-peach-deep)]" />
        </h1>
        <p className="text-[var(--color-cocoa-70)]">Snap a quick pic and turn it into a custom pin or sticker!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Camera Area */}
        <div className="lg:col-span-2">
          {photos.length >= expectedPhotos ? (
            <PhotoResult photos={photos} layout={selectedLayout} onRetake={handleRetake} />
          ) : (
            <div className="flex flex-col">
              <CameraPreview filter={selectedFilter.css} onCapture={handleCapture} />
              
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[var(--color-cocoa-70)] bg-[var(--color-paper)] py-2 px-4 rounded-full border-[1.5px] border-[var(--color-border-warm)] w-max mx-auto shadow-sm">
                <ShieldCheck className="w-4 h-4 text-[var(--color-mint-deep)]" />
                <span>Your photos stay on your device unless you choose to upload them.</span>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Controls */}
        <div className="flex flex-col gap-6">
          <div className="bg-[var(--color-paper)] p-6 rounded-[24px] border-[1.5px] border-[var(--color-border-warm)] shadow-sm">
            <h3 className="font-heading font-bold text-lg text-[var(--color-cocoa)] mb-4 flex items-center gap-2">
              <Layout className="w-5 h-5" />
              Layout
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'single', label: 'Single Photo' },
                { id: 'strip-3', label: '3-Photo Strip' },
                { id: 'strip-4', label: '4-Photo Strip' },
                { id: 'grid-4', label: '2x2 Grid' }
              ].map(layout => (
                <button
                  key={layout.id}
                  disabled={photos.length > 0}
                  onClick={() => setSelectedLayout(layout.id as LayoutType)}
                  className={`py-3 px-2 text-sm rounded-[12px] font-semibold transition-colors ${
                    selectedLayout === layout.id
                      ? 'bg-[var(--color-peach-soft)] text-[var(--color-cocoa)] border-[1.5px] border-[var(--color-peach-deep)]'
                      : 'bg-[var(--color-cream)] text-[var(--color-cocoa-70)] border-[1.5px] border-[var(--color-border-warm)] hover:border-[var(--color-peach)] disabled:opacity-50 disabled:cursor-not-allowed'
                  }`}
                >
                  {layout.label}
                </button>
              ))}
            </div>
            {photos.length > 0 && photos.length < expectedPhotos && (
              <p className="text-sm text-[var(--color-peach-deep)] font-semibold mt-4 text-center">
                Photo {photos.length} of {expectedPhotos} taken. Get ready!
              </p>
            )}
          </div>

          <div className="bg-[var(--color-paper)] p-6 rounded-[24px] border-[1.5px] border-[var(--color-border-warm)] shadow-sm">
            <h3 className="font-heading font-bold text-lg text-[var(--color-cocoa)] mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Filters
            </h3>
            <div className="flex flex-col gap-3">
              {FILTERS.map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter)}
                  className={`flex items-center p-3 rounded-[12px] transition-all ${
                    selectedFilter.id === filter.id
                      ? 'bg-[var(--color-peach-soft)] border-[1.5px] border-[var(--color-peach-deep)]'
                      : 'bg-[var(--color-cream)] border-[1.5px] border-[var(--color-border-warm)] hover:border-[var(--color-peach)]'
                  }`}
                >
                  {/* Miniature preview circle */}
                  <div 
                    className="w-10 h-10 rounded-full border-[1.5px] border-white shadow-sm overflow-hidden bg-[url('https://placehold.co/100x100/FFF6EC/4A2C2A?text=Preview')] bg-cover"
                    style={{ filter: filter.css }}
                  />
                  <span className={`ml-4 font-semibold ${
                    selectedFilter.id === filter.id ? 'text-[var(--color-cocoa)]' : 'text-[var(--color-cocoa-70)]'
                  }`}>
                    {filter.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
