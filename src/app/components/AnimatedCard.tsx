'use client';

import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

type AnimatedCardProps = {
  items: {
    image: string;
    title: string;
  }[];
};

const AnimatedCardStack: React.FC<AnimatedCardProps> = ({ items }) => {
  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, {
    damping: 20,
    stiffness: 100,
  });

  return (
    <div className="relative h-[200vh] flex items-center justify-center bg-white overflow-hidden">
      {items.map((item, index) => {
        const start = index * 0.1;
        const end = start + 0.2;
        const y = useTransform(smoothScroll, [start, end], [100, 0]);
        const opacity = useTransform(smoothScroll, [start, end], [0, 1]);

        const exitY = useTransform(smoothScroll, [end, end + 0.1], [0, -100]);
        const exitOpacity = useTransform(smoothScroll, [end, end + 0.1], [1, 0]);

        return (
          <motion.div
            key={index}
            style={{
              y,
              opacity,
              zIndex: items.length - index,
              position: 'absolute',
              transformStyle: 'preserve-3d',
            }}
            className="w-[300px] sm:w-[400px] rounded-xl shadow-xl bg-white overflow-hidden transition-all"
          >
            <img src={item.image} alt={item.title} className="w-full h-64 object-cover" />
            <div className="p-4 text-center font-semibold text-lg text-gray-800">
              {item.title}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default AnimatedCardStack;
