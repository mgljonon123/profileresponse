'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const SplineViewer = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadSplineViewer = async () => {
      try {
        // Dynamically import the Spline viewer script
        await import('@splinetool/viewer');
        
        if (containerRef.current) {
          const viewer = document.createElement('spline-viewer');
          viewer.setAttribute('url', 'https://prod.spline.design/9kUyxvQoK5udN49V/scene.splinecode');
          viewer.style.width = '100%';
          viewer.style.height = '100%';
          viewer.style.position = 'relative';
          viewer.style.zIndex = '1';
          
          containerRef.current.appendChild(viewer);
        }
      } catch (error) {
        console.error('Error loading Spline viewer:', error);
      }
    };

    loadSplineViewer();

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full" />
  );
};

export default dynamic(() => Promise.resolve(SplineViewer), {
  ssr: false
}); 