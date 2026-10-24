import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Layers,
  Terminal,
  Server,
  Cpu,
  Network,
  Compass,
  ShieldCheck,
  Bot,
  Sparkles,
  Activity,
} from 'lucide-react';
import { motion } from 'motion/react';
import { FocusNode } from '../types';

export const CurrentFocus: React.FC = () => {
  const { focusNodes } = usePortfolio();
  const [activeNodeId, setActiveNodeId] = useState<string>('fn-1');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers':
        return <Layers className="w-5 h-5 text-[#D7E2EA]" />;
      case 'Terminal':
        return <Terminal className="w-5 h-5 text-emerald-400" />;
      case 'Server':
        return <Server className="w-5 h-5 text-[#BBCCD7]" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-white" />;
      case 'Network':
        return <Network className="w-5 h-5 text-[#D7E2EA]" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-amber-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case 'Bot':
        return <Bot className="w-5 h-5 text-[#BBCCD7]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#D7E2EA]" />;
    }
  };

  const getStatusBadge = (status: FocusNode['status']) => {
    switch (status) {
      case 'In Production':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60';
      case 'Deep Dive':
        return 'bg-white/10 text-white border-white/20';
      case 'Active Learning':
        return 'bg-[#18181B] text-[#D7E2EA] border-white/15';
      default:
        return 'bg-black/50 text-[#BBCCD7] border-white/10';
    }
  };

  const activeNode = focusNodes.find((n) => n.id === activeNodeId) || focusNodes[0];

  return (
    <section id="focus" className="py-20 relative overflow-hidden font-['Kanit',sans-serif] text-[#D7E2EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-left mb-12">
          <div className="inline-flex items-center gap-2 text-[#BBCCD7] text-xs font-mono font-semibold uppercase tracking-widest mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Active Engineering Radar</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight hero-heading">
            Currently Building &amp; Learning
          </h2>
          <p className="text-sm text-[#BBCCD7]/70 mt-2 max-w-xl font-light">
            Interactive roadmap nodes showcasing active technical frontiers, architectural explorations, and modern automation initiatives.
          </p>
        </div>

        {/* Dynamic Nodes Grid & Active Detail Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive Nodes Array (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {focusNodes.map((node) => {
              const isSelected = activeNodeId === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => setActiveNodeId(node.id)}
                  className={`text-left p-5 rounded-[24px] border transition-all relative overflow-hidden cursor-pointer ${
                    isSelected
                      ? 'bg-[#18181B] border-[#D7E2EA] shadow-[0_10px_30px_rgba(215,226,234,0.1)] scale-[1.02]'
                      : 'bg-[#121212] border-white/10 hover:bg-[#18181B] hover:border-white/20'
                  }`}
                >
                  {/* Subtle active border indicator */}
                  {isSelected && (
                    <span className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#646973] to-[#BBCCD7]" />
                  )}

                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-black/60 border border-white/10">
                      {getIcon(node.icon)}
                    </div>
                    <span
                      className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${getStatusBadge(
                        node.status
                      )}`}
                    >
                      {node.status}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white uppercase tracking-wide">
                    {node.title}
                  </h3>
                  <span className="text-[11px] text-[#BBCCD7]/60 font-mono block mt-1">
                    {node.category}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Detail Spotlight Stage (5 cols) */}
          <div className="lg:col-span-5">
            <motion.div
              key={activeNode.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-8 rounded-[32px] border-2 border-[#D7E2EA] bg-[#121212] relative overflow-hidden shadow-2xl"
            >
              <div className="flex items-center gap-3.5 mb-4">
                <div className="p-3 rounded-2xl bg-black/60 border border-white/15 text-[#D7E2EA] shadow-md">
                  {getIcon(activeNode.icon)}
                </div>
                <div>
                  <span className="text-xs font-mono text-[#BBCCD7] uppercase tracking-wider">
                    {activeNode.category}
                  </span>
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">
                    {activeNode.title}
                  </h3>
                </div>
              </div>

              <div className="space-y-4 pt-3 border-t border-white/10">
                <div>
                  <div className="text-xs font-semibold text-[#BBCCD7]/70 uppercase tracking-wider font-mono mb-1">
                    Exploration Focus
                  </div>
                  <p className="text-sm text-[#D7E2EA] leading-relaxed font-light">
                    {activeNode.description}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#BBCCD7]/60 uppercase">Current Phase</span>
                    <span className="text-white font-semibold">{activeNode.status}</span>
                  </div>
                  <div className="h-2 w-full bg-black/80 rounded-full overflow-hidden border border-white/10">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        activeNode.status === 'In Production'
                          ? 'w-4/5 bg-emerald-400'
                          : 'w-3/5 bg-gradient-to-r from-[#646973] to-[#BBCCD7]'
                      }`}
                    />
                  </div>
                </div>

                <div className="pt-2 text-xs text-[#BBCCD7]/60 flex items-center gap-2 font-mono">
                  <Activity className="w-4 h-4 text-emerald-400 animate-pulse shrink-0" />
                  <span>Actively applied in SSUET 5th semester projects and production code.</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
