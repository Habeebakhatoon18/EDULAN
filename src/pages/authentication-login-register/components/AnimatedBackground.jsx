import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) return;

    const ctx = canvas?.getContext('2d');
    let animationFrameId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Floating blobs
    const blobs = [
      {
        x: Math.random() * canvas?.width,
        y: Math.random() * canvas?.height,
        radius: 150,
        dx: 0.5,
        dy: 0.3,
        color: 'rgba(255, 154, 139, 0.1)' // primary color
      },
      {
        x: Math.random() * canvas?.width,
        y: Math.random() * canvas?.height,
        radius: 120,
        dx: -0.3,
        dy: 0.4,
        color: 'rgba(168, 230, 207, 0.1)' // secondary color
      },
      {
        x: Math.random() * canvas?.width,
        y: Math.random() * canvas?.height,
        radius: 100,
        dx: 0.4,
        dy: -0.2,
        color: 'rgba(255, 211, 165, 0.1)' // accent color
      }
    ];

    const animate = () => {
      ctx?.clearRect(0, 0, canvas?.width, canvas?.height);

      blobs?.forEach(blob => {
        // Update position
        blob.x += blob?.dx;
        blob.y += blob?.dy;

        // Bounce off edges
        if (blob?.x + blob?.radius > canvas?.width || blob?.x - blob?.radius < 0) {
          blob.dx = -blob?.dx;
        }
        if (blob?.y + blob?.radius > canvas?.height || blob?.y - blob?.radius < 0) {
          blob.dy = -blob?.dy;
        }

        // Create gradient
        const gradient = ctx?.createRadialGradient(
          blob?.x, blob?.y, 0,
          blob?.x, blob?.y, blob?.radius
        );
        gradient?.addColorStop(0, blob?.color);
        gradient?.addColorStop(1, 'rgba(255, 255, 255, 0)');

        // Draw blob
        ctx.fillStyle = gradient;
        ctx?.beginPath();
        ctx?.arc(blob?.x, blob?.y, blob?.radius, 0, Math.PI * 2);
        ctx?.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default AnimatedBackground;