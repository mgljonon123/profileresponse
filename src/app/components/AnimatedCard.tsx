import { useState, useRef } from "react";

interface AnimatedCardProps {
  image: string;
  title: string;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ image, title }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || !cardRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const xPos = e.clientX - rect.left;
    const yPos = e.clientY - rect.top;

    const xAxis = (rect.width / 2 - xPos) / 25;
    const yAxis = (rect.height / 2 - yPos) / 25;

    if (cardRef.current) {
      cardRef.current.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (cardRef.current) {
      cardRef.current.style.transition = "transform 0.1s ease";
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transform = "rotateY(0deg) rotateX(0deg)";
      cardRef.current.style.transition = "transform 0.5s ease";
    }
  };

  return (
    <div
      className="flex flex-col items-center"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="image-container" ref={cardRef}>
        <img
          src={image}
          alt={title}
          className="w-[300px] h-[420px] object-cover rounded-lg shadow-lg"
        />
        <div className="image-overlay"></div>
      </div>
      <p className="text-sm mt-3 font-medium text-black">{title}</p>

      <style jsx>{`
        .image-container {
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.6s;
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            rgba(66, 139, 202, 0.8) 0%,
            rgba(0, 76, 153, 0.9) 100%
          );
          opacity: 0;
          transition: opacity 0.4s;
          border-radius: 12px;
        }

        .image-container:hover .image-overlay {
          opacity: 0.3;
        }

        .image-container:hover img {
          transform: scale(1.05);
        }

        img {
          transition: transform 0.6s;
        }
      `}</style>
    </div>
  );
};

export default AnimatedCard;
