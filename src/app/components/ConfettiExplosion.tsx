import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface Confetti {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  size: number;
  velocityX: number;
  velocityY: number;
}

const COLORS = ['#ff1744', '#ff69b4', '#ffd700', '#ff6b9d', '#ffc0cb', '#ffb6c1'];

export function ConfettiExplosion() {
  const [confetti, setConfetti] = useState<Confetti[]>([]);

  useEffect(() => {
    const pieces = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: 50,
      y: 50,
      rotation: Math.random() * 360,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 8 + Math.random() * 8,
      velocityX: (Math.random() - 0.5) * 200,
      velocityY: (Math.random() - 0.5) * 200 - 50,
    }));
    setConfetti(pieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '0%',
          }}
          initial={{
            x: 0,
            y: 0,
            rotate: piece.rotation,
            opacity: 1,
          }}
          animate={{
            x: piece.velocityX,
            y: [0, piece.velocityY, piece.velocityY + 400],
            rotate: piece.rotation + 720,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 3,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}
