import React from 'react';
import Link from 'next/link';
import { Sparkles, Camera, ArrowRight, Paintbrush } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--color-cream)] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-[var(--color-mint)] rounded-full opacity-30 blur-2xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-[var(--color-peach)] rounded-full opacity-30 blur-2xl animate-pulse delay-700"></div>
      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-[var(--color-butter)] rounded-full opacity-40 blur-xl animate-pulse delay-1000"></div>

      <div className="max-w-4xl w-full text-center z-10">
        <div className="mb-6 flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-paper)] border-[1.5px] border-[var(--color-border-warm)] shadow-sm text-sm font-semibold text-[var(--color-peach-deep)]">
            <Sparkles className="w-4 h-4" />
            <span>Welcome to Paper & Peach</span>
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-heading font-bold text-[var(--color-cocoa)] mb-6 leading-tight">
          Turn your <span className="text-[var(--color-peach-deep)] underline decoration-[var(--color-mint)] decoration-4 underline-offset-8">moments</span> into custom merchandise.
        </h1>
        
        <p className="text-lg md:text-xl text-[var(--color-cocoa-70)] mb-10 max-w-2xl mx-auto">
          Create aesthetic custom pins, stickers, and photocards directly from your browser. 
          Use our interactive Design Studio or snap a pic in our Online Photobooth.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/shop" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-8 py-4 bg-[var(--color-peach)] hover:bg-[var(--color-peach-deep)] text-[var(--color-cocoa)] font-bold rounded-[999px] shadow-[var(--shadow-sticker)] border-4 border-white transition-transform hover:scale-105 flex items-center justify-center gap-2 text-lg">
              <Paintbrush className="w-5 h-5" />
              Start Designing
            </button>
          </Link>
          
          <Link href="/photobooth" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-8 py-4 bg-[var(--color-mint)] hover:bg-[var(--color-mint-deep)] text-[var(--color-cocoa)] hover:text-white font-bold rounded-[999px] shadow-[var(--shadow-sticker)] border-4 border-white transition-all hover:scale-105 flex items-center justify-center gap-2 text-lg">
              <Camera className="w-5 h-5" />
              Try Photobooth
            </button>
          </Link>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-8 text-[var(--color-cocoa-70)] font-semibold text-sm">
          <Link href="/cart" className="hover:text-[var(--color-peach-deep)] flex items-center gap-1 transition-colors">
            Cart <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/account" className="hover:text-[var(--color-peach-deep)] flex items-center gap-1 transition-colors">
            My Account <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/admin" className="hover:text-[var(--color-peach-deep)] flex items-center gap-1 transition-colors">
            Admin <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
