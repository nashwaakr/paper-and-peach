'use client';
import Link from 'next/link';
import { ArrowLeft, Save, ShoppingCart } from 'lucide-react';
import { useStudioStore } from '@/store/useStudioStore';
import { Studio } from '@/components/studio/Studio';
import { Button } from '@/components/ui/Button';

export default function StudioPage() {
  const setupComplete = useStudioStore((s) => s.setupComplete);

  return (
    <div className="flex flex-col">
      {setupComplete && (
        <header className="h-16 flex items-center justify-between px-4 bg-[var(--color-paper)] border-b-[1.5px] border-[var(--color-border-warm)] shrink-0">
          <div className="flex items-center gap-4">
            <Link
              href="/shop"
              className="p-2 text-[var(--color-cocoa-70)] hover:text-[var(--color-cocoa)] hover:bg-[var(--color-cream)] rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="font-heading font-bold text-lg text-[var(--color-cocoa)]">
                Untitled Design
              </h1>
              <p className="text-xs text-[var(--color-cocoa-70)]">Unsaved changes</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" className="gap-2">
              <Save className="w-4 h-4" />
              Save
            </Button>
            <Button variant="primary" size="sm" className="gap-2">
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </Button>
          </div>
        </header>
      )}

      <div className="p-4">
        <Studio />
      </div>
    </div>
  );
}