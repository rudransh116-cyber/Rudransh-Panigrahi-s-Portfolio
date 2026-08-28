import React, { useEffect, useRef } from 'react';

interface PointerArrowBackgroundProps {
  gridSpacing?: number;
  arrowLength?: number;
  theme?: 'light' | 'dark';
}

export const PointerArrowBackground: React.FC<PointerArrowBackgroundProps> = ({
  gridSpacing = 52,
  arrowLength = 9,
  theme = 'light',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePos = useRef<{ x: number; y: number }>({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 500,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 500,
  });
  const currentAngles = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const handleResize = () => {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Render loop with angle damping
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const mx = mousePos.current.x;
      const my = mousePos.current.y;

      const cols = Math.ceil(width / gridSpacing) + 1;
      const rows = Math.ceil(height / gridSpacing) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gridSpacing + (gridSpacing / 2);
          const y = j * gridSpacing + (gridSpacing / 2);

          const dx = mx - x;
          const dy = my - y;
          const dist = Math.hypot(dx, dy);
          const targetAngle = Math.atan2(dy, dx);

          const key = `${i}-${j}`;
          const prevAngle = currentAngles.current.get(key) ?? targetAngle;

          // Shortest angle interpolation
          let diff = (targetAngle - prevAngle) % (Math.PI * 2);
          if (diff < -Math.PI) diff += Math.PI * 2;
          if (diff > Math.PI) diff -= Math.PI * 2;
          const newAngle = prevAngle + diff * 0.15;
          currentAngles.current.set(key, newAngle);

          // Distance-based subtle opacity and delicate styling
          const proximity = Math.max(0, 1 - dist / 500);
          
          let color: string;
          if (theme === 'dark') {
            const alpha = 0.12 + proximity * 0.28;
            color = `rgba(130, 135, 150, ${alpha})`;
          } else {
            const alpha = 0.11 + proximity * 0.25;
            color = `rgba(175, 180, 192, ${alpha})`;
          }

          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(newAngle);

          // Draw simple "->" arrow
          ctx.strokeStyle = color;
          ctx.lineWidth = 1.1;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';

          // Stem (-)
          const halfLen = arrowLength / 2;
          ctx.beginPath();
          ctx.moveTo(-halfLen, 0);
          ctx.lineTo(halfLen, 0);

          // Arrow head (>)
          const headSize = 3.2;
          ctx.moveTo(halfLen - headSize, -headSize * 0.75);
          ctx.lineTo(halfLen, 0);
          ctx.lineTo(halfLen - headSize, headSize * 0.75);
          ctx.stroke();

          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [gridSpacing, arrowLength, theme]);

  return (
    <canvas
      ref={canvasRef}
      id="pointer-arrow-grid-canvas"
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};
