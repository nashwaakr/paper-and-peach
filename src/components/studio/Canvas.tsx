'use client';
import React, { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Rect, Circle, Transformer, Group } from 'react-konva';
import { useStudioStore } from '@/store/useStudioStore';

export function CanvasArea() {
  const { canvasConfig, layers, selectedLayerId, setSelectedLayer } = useStudioStore();
  const stageRef = useRef<any>(null);
  const trRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Update canvas dimensions based on container
  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
    
    const handleResize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update Transformer selection
  useEffect(() => {
    if (selectedLayerId && trRef.current && stageRef.current) {
      const node = stageRef.current.findOne(`#${selectedLayerId}`);
      if (node) {
        trRef.current.nodes([node]);
        trRef.current.getLayer().batchDraw();
      }
    } else if (trRef.current) {
      trRef.current.nodes([]);
    }
  }, [selectedLayerId, layers]);

  const handleStageClick = (e: any) => {
    // If we click on empty space, deselect
    if (e.target === e.target.getStage()) {
      setSelectedLayer(null);
    }
  };

  const center = { x: dimensions.width / 2, y: dimensions.height / 2 };
  const canvasSize = canvasConfig.size;
  const safeZone = canvasSize - (canvasConfig.bleed * 2);

  return (
    <div ref={containerRef} className="flex-grow bg-[var(--color-cream)] relative overflow-hidden">
      {/* Zoom and pan controls can go here overlaying the canvas */}
      
      {dimensions.width > 0 && (
        <Stage
          width={dimensions.width}
          height={dimensions.height}
          onMouseDown={handleStageClick}
          onTouchStart={handleStageClick}
          ref={stageRef}
        >
          <Layer>
            {/* Base Canvas shape */}
            <Group x={center.x} y={center.y}>
              {canvasConfig.shape === 'round' && (
                <>
                  {/* Bleed Area (Outer) */}
                  <Circle
                    radius={canvasSize / 2}
                    fill="var(--color-paper)"
                    stroke="var(--color-berry)"
                    strokeWidth={2}
                    dash={[4, 4]}
                    shadowColor="rgba(74, 44, 42, 0.15)"
                    shadowBlur={16}
                    shadowOffsetY={6}
                  />
                  {/* Safe Zone (Inner) */}
                  <Circle
                    radius={safeZone / 2}
                    stroke="var(--color-mint-deep)"
                    strokeWidth={1}
                    dash={[2, 2]}
                  />
                </>
              )}
              {canvasConfig.shape === 'square' && (
                <>
                  <Rect
                    x={-canvasSize / 2}
                    y={-canvasSize / 2}
                    width={canvasSize}
                    height={canvasSize}
                    fill="var(--color-paper)"
                    stroke="var(--color-berry)"
                    strokeWidth={2}
                    dash={[4, 4]}
                    cornerRadius={16}
                    shadowColor="rgba(74, 44, 42, 0.15)"
                    shadowBlur={16}
                    shadowOffsetY={6}
                  />
                  <Rect
                    x={-safeZone / 2}
                    y={-safeZone / 2}
                    width={safeZone}
                    height={safeZone}
                    stroke="var(--color-mint-deep)"
                    strokeWidth={1}
                    dash={[2, 2]}
                    cornerRadius={12}
                  />
                </>
              )}
            </Group>
          </Layer>
          
          <Layer>
            {/* User Layers */}
            {/* Dummy layer for preview */}
            <Group x={center.x} y={center.y}>
              <Circle id="dummy-layer" radius={50} fill="var(--color-peach)" onClick={() => setSelectedLayer("dummy-layer")} draggable />
            </Group>
            
            <Transformer
              ref={trRef}
              boundBoxFunc={(oldBox, newBox) => {
                if (newBox.width < 5 || newBox.height < 5) return oldBox;
                return newBox;
              }}
              borderStroke="var(--color-peach-deep)"
              anchorStroke="var(--color-peach-deep)"
              anchorFill="white"
            />
          </Layer>
        </Stage>
      )}
    </div>
  );
}
