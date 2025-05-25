'use client';

import { useRive } from '@rive-app/react-canvas';
import { useState } from 'react';

export default function RiveRobot() {
  const { RiveComponent } = useRive({
    src: '/robot_bouncing (5).riv',
    autoplay: true,
  });

  const [showBubble, setShowBubble] = useState(false);

  const handleRobotClick = () => {
    setShowBubble(true);
    setTimeout(() => setShowBubble(false), 3500); 
  };

  return (
    <div className="relative flex items-center justify-center" style={{ width: 300, height: 300 }}>
      <div onClick={handleRobotClick} className="cursor-pointer w-full h-full flex items-center justify-center">
        <RiveComponent />
      </div>
      {showBubble && (
        <div
          className="absolute -top-16 left-[70%] sm:left-[75%] bg-white text-gray-900 text-sm sm:text-base px-3 py-2 rounded-xl shadow-lg border border-gray-200 whitespace-pre-line z-10"
          style={{ minWidth: 180, maxWidth: 240 }}
        >
          Та их зүйл бодолгүй,<br />шууд хариулах<br />нь илүү оновчтой!
          <div className="absolute left-6 -bottom-2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
        </div>
      )}
    </div>
  );
}