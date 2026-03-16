"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Environment, ContactShadows } from "@react-three/drei";
import { Suspense, useRef, useState, useEffect } from "react";
import * as THREE from "three";

function FloatingBook({ onEnter }: { onEnter: () => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [hovered]);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Base rotation offsets to keep it matching the original look
    const baseRotX = 0.4;
    const baseRotY = -0.6;
    
    // Calculate target rotations based on mouse position
    const targetRotX = baseRotX - (state.pointer.y * 0.4);
    const targetRotY = baseRotY + (state.pointer.x * 0.4);
    
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
  });

  return (
    <Float
      speed={2} 
      rotationIntensity={0} // Disable Float's default rotation so useFrame controls it
      floatIntensity={0.5} 
    >
      <group 
        ref={groupRef}
        rotation={[0.4, -0.6, 0]}
        onClick={(e) => { e.stopPropagation(); onEnter(); }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={(e) => { e.stopPropagation(); setHovered(false); }}
      >
        {/* Spine */}
        <mesh position={[-1.4, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.2, 4.1, 0.4]} />
          <meshStandardMaterial color="#111" roughness={0.7} />
        </mesh>
        
        {/* Back Cover */}
        <mesh position={[0.1, 0, -0.18]} castShadow receiveShadow>
          <boxGeometry args={[2.8, 4.1, 0.04]} />
          <meshStandardMaterial color="#111" roughness={0.7} />
        </mesh>

        {/* Front Cover */}
        <mesh position={[0.1, 0, 0.18]} castShadow receiveShadow>
          <boxGeometry args={[2.8, 4.1, 0.04]} />
          <meshStandardMaterial color="#111" roughness={0.7} />
        </mesh>
        
        {/* Pages (Solid Block) */}
        <mesh position={[0.1, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.7, 3.9, 0.32]} />
          <meshStandardMaterial color="#ccc" roughness={0.9} />
        </mesh>
        
        {/* Top Open Page simulated pivoting from the spine */}
        <group position={[-1.3, 0, 0.201]}>
          <mesh rotation={[0, -0.15, 0]} position={[1.35, 0, 0]}>
            <planeGeometry args={[2.7, 3.9]} />
            <meshStandardMaterial color="#fff" side={THREE.DoubleSide} />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

export default function HeroSection({ onEnter }: { onEnter: () => void }) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <motion.section 
      style={{ opacity }}
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#3a3a4a] via-[#181820] to-[#050505] text-white"
    >
      {/* Background abstract blur */}
      <div className="absolute inset-0 z-0 opacity-60 mix-blend-screen pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[60vw] h-[60vw] rounded-full bg-purple-500/10 blur-[150px]" />
      </div>

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 z-0 opacity-30 mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <motion.div 
        style={{ y: y1 }}
        className="relative z-10 flex flex-col items-center text-center max-w-4xl px-4 mt-12"
      >
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="text-6xl md:text-8xl lg:text-9xl font-serif italic tracking-wider mb-6 drop-shadow-2xl text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-purple-200"
        >
          StoryVerse AI
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-lg md:text-xl font-sans tracking-[0.3em] text-white/50 uppercase mb-16 drop-shadow-md"
        >
          Stories that evolve with every choice.
        </motion.p>

        {/* 3D Book Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="w-full h-[45vh] md:h-[55vh] relative mb-16 cursor-pointer group"
          onClick={onEnter}
        >
          {/* subtle glow behind book entirely in HTML to separate it from bg */}
          <div className="absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-purple-500/20 transition-colors duration-1000" />
          
          <Canvas camera={{ position: [0, 0, 7], fov: 40 }}>
            <ambientLight intensity={0.8} />
            <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={2} castShadow color="#ffffff" />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#e0e0f0" />
            <Suspense fallback={null}>
              <FloatingBook onEnter={onEnter} />
              <Environment preset="city" />
              <ContactShadows position={[0, -2.5, 0]} opacity={0.8} scale={20} blur={3} far={5} color="#000" />
            </Suspense>
            <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2 + 0.1} minPolarAngle={Math.PI / 3 - 0.1} />
          </Canvas>
        </motion.div>

        <motion.button
          onClick={onEnter}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,1)", color: "rgba(30,20,50,1)" }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-4 border border-white/20 rounded-full font-sans text-xs tracking-[0.2em] uppercase text-white bg-white/5 backdrop-blur-md shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-all duration-500 hover:shadow-[0_0_40px_rgba(129,140,248,0.4)]"
        >
          Enter the Story
        </motion.button>
      </motion.div>
    </motion.section>
  );
}
