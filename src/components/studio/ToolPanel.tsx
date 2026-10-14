'use client';
import React, { useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import { useStudioStore } from '@/store/useStudioStore';
import { ColorPicker } from './ColorPicker';
import {
  addImageFromFile,
  addShape,
  addText,
  applyColorToSelection,
  applyTextStyle,
  readActiveText,
  setActiveTextContent,
  setBackground,
  type ElementKind,
} from '@/lib/studioActions';

const FONTS = ['Georgia', 'Trebuchet MS', 'Verdana', 'Courier New', 'Comic Sans MS', 'Impact'];

const ELEMENTS: { kind: ElementKind; label: string }[] = [
  { kind: 'circle', label: 'Circle' },
  { kind: 'square', label: 'Square' },
  { kind: 'triangle', label: 'Triangle' },
  { kind: 'heart', label: 'Heart' },
  { kind: 'star', label: 'Star' },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-[var(--color-cocoa)] mb-3">{title}</h3>
      {children}
    </div>
  );
}

const primaryBtn =
  'w-full py-3 rounded-[16px] border-[1.5px] border-[var(--color-peach-deep)] bg-[var(--color-peach-soft)] text-[var(--color-cocoa)] font-semibold hover:brightness-95 transition disabled:opacity-50 disabled:cursor-not-allowed';

export function ToolPanel() {
  const {
    canvas, selectedTool, setTool, hasSelection, activeText, setActiveText,
    color, setColor, brushColor, setBrushColor, brushSize, setBrushSize, bgColor, setBgColor,
  } = useStudioStore();

  const fileRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState('');
  const [font, setFont] = useState(FONTS[0]);
  const [fontSize, setFontSize] = useState(56);
  const [error, setError] = useState('');

  // Saat ada teks terpilih di canvas, panel menampilkan & mengedit teks itu.
  const shownText = activeText ? activeText.text : text;
  const shownFont = activeText ? activeText.fontFamily : font;
  const shownSize = activeText ? activeText.fontSize : fontSize;
  const shownColor = activeText ? activeText.fill : color;

  const refreshActiveText = () => {
    if (canvas) setActiveText(readActiveText(canvas));
  };

  const pickColor = (c: string) => {
    setColor(c);
    if (canvas) {
      applyColorToSelection(canvas, c); // ikut mengubah objek yang sedang dipilih
      refreshActiveText();
    }
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file || !canvas) return;
    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file (PNG, JPG, WebP, or SVG).');
      return;
    }
    try {
      setError('');
      await addImageFromFile(canvas, file);
      setTool('select');
    } catch {
      setError('We could not read that image. Try another file.');
    }
  };

  let body: React.ReactNode = null;

  if (selectedTool === 'select') {
    body = (
      <>
        <Section title="Sticker background">
          <ColorPicker
            value={bgColor}
            onChange={(c) => {
              setBgColor(c);
              if (canvas) setBackground(canvas, c);
            }}
          />
        </Section>
        <Section title="Selected object color">
          <ColorPicker value={color} onChange={pickColor} />
          <p className="text-xs text-[var(--color-cocoa-70)] mt-3">
            {hasSelection
              ? 'Click a color to recolor the selected text, shape, or doodle.'
              : 'Select an object on the canvas first. Press Delete to remove it.'}
          </p>
        </Section>
      </>
    );
  }

  if (selectedTool === 'upload') {
    body = (
      <Section title="Upload an image">
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        <button
          type="button"
          disabled={!canvas}
          onClick={() => fileRef.current?.click()}
          className="w-full flex flex-col items-center gap-2 py-10 rounded-[16px] border-[1.5px] border-dashed border-[var(--color-peach-deep)] bg-[var(--color-cream)] text-[var(--color-cocoa)] font-semibold hover:bg-[var(--color-peach-soft)] transition disabled:opacity-50"
        >
          <Upload size={28} />
          Choose image
        </button>
        {error && <p className="text-xs text-red-600 mt-3">{error}</p>}
        <p className="text-xs text-[var(--color-cocoa-70)] mt-3">
          Drag the image to move it, and use the corner handles to resize or rotate.
        </p>
      </Section>
    );
  }

  if (selectedTool === 'text') {
    body = (
      <>
        <Section title={activeText ? 'Editing selected text' : 'Your text'}>
          <input
            value={shownText}
            onChange={(e) => {
              const v = e.target.value;
              if (activeText && canvas) {
                setActiveTextContent(canvas, v);
                refreshActiveText();
              } else {
                setText(v);
              }
            }}
            placeholder="Type something sweet"
            className="w-full px-4 py-3 rounded-[16px] border-[1.5px] border-[var(--color-border-warm)] bg-[var(--color-cream)] text-[var(--color-cocoa)] outline-none focus:border-[var(--color-peach-deep)]"
          />
        </Section>
        <Section title="Font">
          <select
            value={shownFont}
            onChange={(e) => {
              setFont(e.target.value);
              if (canvas) {
                applyTextStyle(canvas, { fontFamily: e.target.value });
                refreshActiveText();
              }
            }}
            className="w-full px-4 py-3 rounded-[16px] border-[1.5px] border-[var(--color-border-warm)] bg-[var(--color-cream)] text-[var(--color-cocoa)]"
          >
            {FONTS.map((f) => (
              <option key={f} value={f} style={{ fontFamily: f }}>{f}</option>
            ))}
          </select>
        </Section>
        <Section title={`Size: ${shownSize}`}>
          <input
            type="range" min={16} max={140} value={shownSize}
            onChange={(e) => {
              const n = Number(e.target.value);
              setFontSize(n);
              if (canvas) {
                applyTextStyle(canvas, { fontSize: n });
                refreshActiveText();
              }
            }}
            className="w-full accent-[var(--color-peach-deep)]"
          />
        </Section>
        <Section title="Color">
          <ColorPicker value={shownColor} onChange={pickColor} />
        </Section>
        <button
          type="button"
          disabled={!canvas}
          className={primaryBtn}
          onClick={async () => {
            if (!canvas) return;
            await addText(canvas, {
              text: activeText ? '' : text,
              color: shownColor,
              fontFamily: shownFont,
              fontSize: shownSize,
            });
            setText('');
          }}
        >
          {activeText ? 'Add another text' : 'Add text'}
        </button>
        <p className="text-xs text-[var(--color-cocoa-70)] mt-3">
          Click any text on the canvas to edit it here. Drag to move it, or double-click to type directly on the canvas.
        </p>
      </>
    );
  }

  if (selectedTool === 'draw') {
    body = (
      <>
        <Section title="Brush color">
          <ColorPicker value={brushColor} onChange={setBrushColor} />
        </Section>
        <Section title={`Brush size: ${brushSize}`}>
          <input
            type="range" min={2} max={40} value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="w-full accent-[var(--color-peach-deep)]"
          />
          <div className="mt-4 h-12 flex items-center justify-center rounded-[16px] bg-[var(--color-cream)] border-[1.5px] border-[var(--color-border-warm)]">
            <span
              className="rounded-full"
              style={{ width: brushSize, height: brushSize, backgroundColor: brushColor }}
            />
          </div>
        </Section>
        <p className="text-xs text-[var(--color-cocoa-70)]">
          Draw straight on the canvas. Switch to Select to move or recolor your doodles.
        </p>
      </>
    );
  }

  if (selectedTool === 'elements') {
    body = (
      <>
        <Section title="Color">
          <ColorPicker value={color} onChange={pickColor} />
        </Section>
        <Section title="Shapes">
          <div className="grid grid-cols-2 gap-3">
            {ELEMENTS.map((el) => (
              <button
                key={el.kind}
                type="button"
                disabled={!canvas}
                onClick={async () => {
                  if (!canvas) return;
                  await addShape(canvas, el.kind, color);
                  setTool('select');
                }}
                className="py-4 rounded-[16px] border-[1.5px] border-[var(--color-border-warm)] bg-[var(--color-cream)] text-[var(--color-cocoa)] font-semibold hover:border-[var(--color-peach-deep)] hover:bg-[var(--color-peach-soft)] transition disabled:opacity-50"
              >
                {el.label}
              </button>
            ))}
          </div>
        </Section>
      </>
    );
  }

  if (selectedTool === 'photobooth') {
    body = (
      <p className="text-sm text-[var(--color-cocoa-70)]">
        Photobooth is not available yet. Use Upload to add a photo for now.
      </p>
    );
  }

  return (
    <aside className="w-72 shrink-0 bg-[var(--color-paper)] border-l-[1.5px] border-[var(--color-border-warm)] p-5 overflow-y-auto">
      {body}
    </aside>
  );
}