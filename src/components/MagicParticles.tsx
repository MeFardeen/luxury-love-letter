import { Canvas } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';

export default function MagicParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <Sparkles 
          count={80} 
          scale={12} 
          size={4} 
          speed={0.4} 
          opacity={0.3} 
          color="#E9DDD6" 
        />
      </Canvas>
    </div>
  );
}
