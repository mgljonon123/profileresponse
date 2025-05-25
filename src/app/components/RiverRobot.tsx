'use client';

import { useRive } from '@rive-app/react-canvas';

export default function RiveRobot() {
  const { RiveComponent } = useRive({
    src: '/robot_bouncing (4).riv', 
    autoplay: true,
  })

  return (
    <div style={{ width: '400px', height: '400px' }}>
      <RiveComponent />
    </div>
  );
}