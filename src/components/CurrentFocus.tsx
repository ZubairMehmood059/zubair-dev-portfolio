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
  ArrowRight,
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
        return <Layers className="w-5 h-5 text-blue-400" />;
      case 'Terminal':
        return <Terminal className="w-5 h-5 text-emerald-400" />;
      case 'Server':
        return <Server className="w-5 h-5 text-sky-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-indigo-400" />;
      case 'Network':
        return <Network className="w-5 h-5 text-cyan-400" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-amber-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-blue-400" />;
      case 'Bot':
        return <Bot className="w-5 h-5 text-purple-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-blue-400" />;
    }
  };

  const getStatusBadge = (status: FocusNode['status']) => {
    switch (status) {
      case 'In Production':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60';
      case 'Deep Dive':
        return 'bg-blue-950/80 text-blue-300 border-blue-800/60';
      case 'Active Learning':
        return 'bg-indigo-950/80 text-indigo-300 border-indigo-800/60';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const activeNode = focusNodes.find((n) => n.id === activeNodeId) || focusNodes[0];

  return (
    <section id="focus" className="py-24 relative overflow-hidden bg-[#090c13]/50">
      {/* Background visual connections grid */}
      <div className="absolute inset-0 tech-grid-pattern opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Motion Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-left mb-14"
        >
          <div className="inline-flex items-center gap-2 text-blue-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span>Active Engineering Radar</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading">
            Currently Building &amp; Learning
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl">
            Interactive roadmap nodes showcasing active technical frontiers, architectural explorations, and modern AI automation initiatives.
          </p>
        </motion.div>

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
                  className={`text-left p-4 sm:p-5 rounded-2xl border transition-all relative overflow-hidden cursor-pointer ${
                    isSelected
                      ? 'bg-[#0e1420] border-blue-500/80 shadow-xl shadow-blue-500/15 scale-[1.02]'
                      : 'bg-[#0e1420]/60 border-slate-800/80 hover:bg-[#0e1420] hover:border-slate-700'
                  }`}
                >
                  {/* Subtle active border indicator */}
                  {isSelected && (
                    <span className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-500" />
                  )}

                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-[#111722] border border-slate-800">
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

                  <h3 className="text-sm font-bold text-slate-100 group-hover:text-blue-300 transition-colors font-heading">
                    {node.title}
                  </h3>
                  <span className="text-[11px] text-slate-400 font-mono block mt-1">
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
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="glass-panel p-6 sm:p-8 rounded-2xl border-blue-500/30 relative overflow-hidden shadow-2xl bg-[#0e1420]/90"
            >
              <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-3.5 mb-5">
                <div className="p-3.5 rounded-2xl bg-[#111722] border border-blue-500/40 text-blue-400 shadow-md">
                  {getIcon(activeNode.icon)}
                </div>
                <div>
                  <span className="text-xs font-mono text-blue-400 uppercase tracking-wider font-semibold">
                    {activeNode.category}
                  </span>
                  <h3 className="text-xl font-bold text-white font-heading">
                    {activeNode.title}
                  </h3>
                </div>
              </div>

              <div className="space-y-4 pt-3 border-t border-slate-800">
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono mb-1.5">
                    Exploration Focus
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {activeNode.description}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#111722]/80 border border-slate-800/80 space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Current Phase</span>
                    <span className="text-blue-300 font-semibold">{activeNode.status}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        activeNode.status === 'In Production'
                          ? 'w-4/5 bg-emerald-400'
                          : activeNode.status === 'Deep Dive'
                          ? 'w-3/5 bg-blue-400'
                          : 'w-2/5 bg-indigo-400'
                      }`}
                    />
                  </div>
                </div>

                <div className="pt-2 text-xs text-slate-400 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-400 animate-pulse shrink-0" />
                  <span>Actively applied in SSUET 5th semester projects and personal engineering repositories.</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};
