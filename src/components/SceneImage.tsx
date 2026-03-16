"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface SceneImageProps {
  src: string;
  alt: string;
}

export default function SceneImage({ src, alt }: SceneImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative w-full h-full rounded-sm overflow-hidden border border-black/10 dark:border-white/10 shadow-lg group bg-black/5">
      <motion.div
        initial={{ scale: 1.05, filter: "blur(10px)", opacity: 0 }}
        animate={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="w-full h-full"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-cover grayscale-[0.8] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-in-out ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ transition: "opacity 1s ease-in-out, transform 1s ease-in-out, filter 1s ease-in-out" }}
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          onLoad={() => setImageLoaded(true)}
        />
        {/* Subtle vignette over the image */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.7)_100%)] pointer-events-none" />
      </motion.div>
    </div>
  );
}
