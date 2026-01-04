
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Header } from '../components/Layout';
import { fetchAgents } from '../services/api';
import { Agent } from '../types';

export const Observatory: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const txn_id = searchParams.get('txn_id') || 'V-772';
  
  const [progress, setProgress] = useState(0);
  const [agents, setAgents] = useState<Agent[]>([]);

  useEffect(() => {
    fetchAgents().then(setAgents);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => navigate(`/audit?txn_id=${txn_id}`), 1000);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [navigate, txn_id]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header showBack title={`Evolution Live: ${txn_id}`} />
      
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 p-8 md:p-12 gap-12">
        <div className="lg:col-span-3 flex flex-col items-center justify-center bg-visa-platinum/30 rounded-[40px] border border-visa-border relative overflow-hidden">
           <div className="absolute top-10 left-10">
              <span className="text-visa-navy font-black text-xs tracking-[0.4em] uppercase opacity-40">Agentic Battlefront</span>
           </div>
           
           <div className="relative w-80 h-80 mb-16">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeWidth="4" />
                <circle 
                  cx="50" cy="50" r="45" 
                  fill="none" 
                  stroke="#001d4a" 
                  strokeWidth="6" 
                  strokeDasharray="282.7"
                  strokeDashoffset={282.7 - (282.7 * progress) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-7xl font-black text-visa-navy tracking-tighter italic">{progress}%</span>
                <span className="text-[10px] text-visa-gold font-black uppercase tracking-[0.3em] mt-2">Morphed</span>
              </div>
           </div>

           <div className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-5 gap-6 px-12 pb-16">
              {agents.map((agent, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border border-visa-border shadow-sm transition-all hover:border-visa-gold">
                   <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-visa-platinum flex items-center justify-center text-visa-blue text-xs">
                         <i className={`fa-solid ${agent.icon}`}></i>
                      </div>
                      <span className="text-visa-navy text-[10px] font-black uppercase truncate">{agent.name}</span>
                   </div>
                   <div className="w-full bg-visa-platinum h-1.5 rounded-full mb-2">
                      <div 
                        className="h-full bg-visa-navy transition-all duration-700" 
                        style={{ width: `${progress > (i * 12) ? agent.load : 0}%` }}
                      ></div>
                   </div>
                   <span className="text-[9px] text-visa-navy/30 uppercase font-black tracking-widest">{agent.status}</span>
                </div>
              ))}
           </div>
        </div>

        <div className="space-y-8">
           <div className="bg-visa-navy text-white p-10 rounded-[40px] shadow-2xl border border-white/5">
              <h5 className="text-visa-gold text-xs font-black uppercase mb-8 tracking-[0.2em] italic">Risk Sync Mode</h5>
              <div className="space-y-8">
                 <div className="space-y-2">
                    <div className="text-[10px] text-white/30 font-black uppercase">Initial Vulnerability</div>
                    <div className="text-red-400 text-2xl font-black font-mono">0.829_CRIT</div>
                 </div>
                 <div className="h-px bg-white/10"></div>
                 <div className="space-y-2">
                    <div className="text-[10px] text-white/30 font-black uppercase">Active Shielding</div>
                    <div className="text-green-400 text-5xl font-black font-mono tracking-tighter">
                      {progress < 15 ? '--' : '0.00'}<span className="text-3xl">{(9 - (progress / 12)).toFixed(3).split('.')[1]}</span>
                    </div>
                 </div>
              </div>
           </div>
           <button className="w-full py-5 rounded-3xl bg-red-600/5 border border-red-600/20 text-red-600 font-black text-xs uppercase tracking-[0.3em] hover:bg-red-600 hover:text-white transition-all shadow-xl shadow-red-600/10">
              Kill Sequence
           </button>
        </div>
      </div>
    </div>
  );
};
