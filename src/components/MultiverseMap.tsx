"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Map, X } from "lucide-react";
import ReactFlow, { Background, Controls, MiniMap, Node, Edge } from "reactflow";
import "reactflow/dist/style.css";

interface SessionState {
  sessionId?: string;
  storyHistory?: string[];
  selectedUniverses?: string[];
  emotions?: string[];
}

interface MultiverseMapProps {
  session?: SessionState;
}

export default function MultiverseMap({ session }: MultiverseMapProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { nodes, edges } = useMemo(() => {
    if (!session || !session.storyHistory) return { nodes: [], edges: [] };

    const generatedNodes: Node[] = [];
    const generatedEdges: Edge[] = [];

    session.storyHistory.forEach((story: string, index: number) => {
      // Create a vertical tree layout
      const x = (window?.innerWidth ? window.innerWidth / 2 : 400) - 100; // Centers it roughly
      const y = index * 180 + 50; // Spaced out vertically

      // Build the cinematic node
      generatedNodes.push({
        id: `chapter-${index}`,
        position: { x, y },
        data: { label: `Chapter ${index + 1}` },
        style: {
          background: '#0a0a0a',
          color: '#ffffff',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '12px',
          padding: '12px 24px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.8), inset 0 0 15px rgba(255,255,255,0.05)',
          fontFamily: 'serif',
          letterSpacing: '0.1em',
          fontSize: '14px',
          fontWeight: 'bold',
          width: '200px',
          textAlign: 'center'
        }
      });

      // If there's a previous chapter, create an edge
      if (index > 0) {
        // The choice that led to this chapter is in selectedUniverses[index - 1]
        const choiceLabel = session.selectedUniverses?.[index - 1] || "Continue";

        generatedEdges.push({
          id: `edge-${index - 1}-${index}`,
          source: `chapter-${index - 1}`,
          target: `chapter-${index}`,
          label: choiceLabel,
          style: { stroke: 'rgba(255,255,255,0.5)', strokeWidth: 2 },
          animated: true,
          labelStyle: { fill: 'rgba(255,255,255,0.9)', fontSize: 10, fontFamily: 'sans-serif', letterSpacing: '0.1em' },
          labelBgStyle: { fill: 'rgba(0,0,0,0.8)', stroke: 'rgba(255,255,255,0.2)', strokeWidth: 1 },
          labelBgPadding: [6, 4],
          labelBgBorderRadius: 4
        });
      }
    });

    return { nodes: generatedNodes, edges: generatedEdges };
  }, [session]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-6 py-4 bg-black text-white dark:bg-white dark:text-black rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)] dark:shadow-[0_10px_30px_rgba(255,255,255,0.2)] hover:scale-105 transition-transform"
      >
        <Map size={20} />
        <span className="font-sans text-xs tracking-widest uppercase font-bold">Multiverse Map</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 md:p-8"
          >
            <div className="relative w-full h-full max-w-6xl max-h-[90vh] bg-black/50 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-50 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-colors text-white"
              >
                <X size={20} />
              </button>
              
              <div className="absolute top-8 left-0 right-0 z-40 pointer-events-none">
                <h2 className="font-serif text-3xl md:text-5xl text-center text-white font-bold drop-shadow-xl">
                  The Timeline
                </h2>
                <div className="w-24 h-[1px] bg-white/30 mx-auto mt-4" />
              </div>

              {/* React Flow Canvas */}
              <div className="flex-1 w-full h-full pt-16">
                <ReactFlow 
                  nodes={nodes} 
                  edges={edges}
                  fitView
                  attributionPosition="bottom-right"
                  className="bg-transparent"
                >
                  <Background gap={20} size={1} color="rgba(255,255,255,0.05)" />
                  <Controls className="filter invert opacity-80" />
                  <MiniMap 
                    nodeColor="#fff"
                    maskColor="rgba(0,0,0,0.8)"
                    style={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)' }}
                  />
                </ReactFlow>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
