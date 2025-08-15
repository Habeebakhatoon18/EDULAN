import React, { useEffect, useState } from 'react';

const CursorGlow = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on desktop
    const isDesktop = window.innerWidth >= 1024;
    if (!isDesktop) return;

    const handleMouseMove = (e) => {
      setMousePosition({ x: e?.clientX, y: e?.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-50 transition-opacity duration-300"
      style={{
        left: mousePosition?.x - 100,
        top: mousePosition?.y - 100,
        width: 200,
        height: 200,
        background: 'radial-gradient(circle, rgba(255, 154, 139, 0.15) 0%, rgba(255, 154, 139, 0.05) 50%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(20px)',
        transform: 'translate(-50%, -50%)'
      }}
    />
  );
};

export default CursorGlow;