import { motion } from 'framer-motion';

export default function FloatingParticles({ count = 18, color = 'rgba(255,255,255,0.45)' }) {
  const particles = Array.from({ length: count }, (_, index) => ({
    id: index,
    size: 6 + (index % 5) * 4,
    left: `${(index * 13) % 100}%`,
    duration: 12 + (index % 6) * 3,
    delay: index * 0.45,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.left,
            top: '110%',
            background: color,
            boxShadow: `0 0 18px ${color}`,
          }}
          animate={{
            y: [0, -120, -220],
            opacity: [0, 1, 0.8, 0],
            x: [0, particle.id % 2 === 0 ? 20 : -14, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
