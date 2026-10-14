'use client';
import React from 'react';
import { Undo2, Trash2, Download } from 'lucide-react';
import { useStudioStore } from '@/store/useStudioStore';
import { deleteSelected, exportPng, undoLast } from '@/lib/studioActions';
import { SetupStep } from './SetupStep';
import { Toolbar } from './Toolbar';
import { ToolPanel } from './ToolPanel';
import { StudioCanvas } from './StudioCanvas';

const actionBtn =
  'flex items-center gap-2 px-4 py-2 rounded-[14px] border-[1.5px] border-[var(--color-border-warm)] bg-[var(--color-cream)] text-sm font-semibold text-[var(--color-cocoa)] hover:border-[var(--color-peach-deep)] transition disabled:opacity-40 disabled:cursor-not-allowed';

function Workspace() {
  const { canvas, hasSelection, canvasConfig, setSetupComplete } = useStudioStore();

  return (
    <div className="flex min-h-[80vh] rounded-[28px] overflow-hidden border-[1.5px] border-[var(--color-border-warm)] bg-[var(--color-cream)]">
      <Toolbar />

      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex items-center gap-3 px-5 py-3 border-b-[1.5px] border-[var(--color-border-warm)] bg-[var(--color-paper)]">
          <button className={actionBtn} onClick={() => setSetupComplete(false)}>
            {canvasConfig.shape} · {canvasConfig.sizeLabel}
          </button>
          <div className="flex-1" />
          <button className={actionBtn} disabled={!canvas} onClick={() => canvas && undoLast(canvas)}>
            <Undo2 size={16} /> Undo
          </button>
          <button
            className={actionBtn}
            disabled={!canvas || !hasSelection}
            onClick={() => canvas && deleteSelected(canvas)}
          >
            <Trash2 size={16} /> Delete
          </button>
          <button className={actionBtn} disabled={!canvas} onClick={() => canvas && exportPng(canvas)}>
            <Download size={16} /> Download PNG
          </button>
        </div>

        <div className="flex-1 overflow-auto p-6 flex">
          <div className="m-auto">
            <StudioCanvas />
          </div>
        </div>
      </div>

      <ToolPanel />
    </div>
  );
}

export function Studio() {
  const setupComplete = useStudioStore((s) => s.setupComplete);
  return setupComplete ? <Workspace /> : <SetupStep />;
}