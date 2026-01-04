
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Header } from '../components/Layout';
import { evolveData } from '../services/api';
import { EvolutionResponse } from '../types';

export const AuditFactory: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const txn_id = searchParams.get('txn_id') || 'V-772';
  const [result, setResult] = useState<EvolutionResponse | null>(null);

  useEffect(() => {
    evolveData({ card: '', name: '', expiry: '', jurisdiction: [] }).then(setResult);
  }, []);

  if (!result) return null;

  return (
    <div className="min-h-screen bg-white pb-40">
      <Header showBack title={`Audit Ready: ${txn_id}`} />

      <div className="max-w-6xl mx-auto p-12 space-y-12">
        {/* Survivors - Gold Themed */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {result.tokens.map((token, i) => (
            <div key={token.id} className={`bg-white p-10 rounded-[35px] border-2 transition-all group ${i === 0 ? 'border-visa-gold shadow-2xl scale-105' : 'border-visa-border opacity-60 hover:opacity-100 shadow-sm'}`}>
              <div className="flex justify-between items-start mb-8">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg ${i === 0 ? 'bg-visa-gold text-visa-navy shadow-visa-gold/20' : 'bg-visa-navy text-white shadow-visa-navy/10'}`}>
                  <i className={`fa-solid ${i === 0 ? 'fa-star' : 'fa-award'}`}></i>
                </div>
                <div className="text-right">
                   <div className="text-[10px] text-visa-navy/30 font-black uppercase mb-1">Evo Fitness</div>
                   <div className="text-4xl font-black text-visa-navy italic tracking-tighter">{token.score}%</div>
                </div>
              </div>
              <div className="mb-8 p-4 bg-visa-platinum rounded-2xl border border-visa-border group-hover:border-visa-gold/30 transition-colors">
                <div className="text-[10px] text-visa-gold font-black uppercase tracking-widest mb-2">Vault Identifier</div>
                <div className="text-xs font-mono text-visa-navy font-bold flex justify-between items-center">
                  {token.id} <i className="fa-regular fa-copy cursor-pointer text-visa-navy/30 hover:text-visa-blue"></i>
                </div>
              </div>
              <div className="text-[10px] text-visa-navy/40 leading-relaxed font-bold uppercase tracking-tight">
                 {token.lineage}
              </div>
            </div>
          ))}
        </div>

        {/* Trace Visual - Professional Map */}
        <div className="bg-visa-platinum/50 rounded-[40px] p-16 border border-visa-border relative flex flex-col items-center shadow-inner">
           <div className="absolute top-10 left-1/2 -translate-x-1/2 text-center">
              <h4 className="text-visa-navy text-xs font-black uppercase tracking-[0.5em] opacity-30">Network Node Lineage</h4>
           </div>
           <div className="relative w-full max-w-3xl h-80 flex items-center justify-center">
              {/* Central Root - Custom VORN branding */}
              <div className="w-24 h-24 rounded-full bg-visa-navy text-white flex items-center justify-center font-black italic shadow-2xl relative z-10 border-4 border-white overflow-hidden">
                <span className="v-letter">V</span>ORN
              </div>
              
              {/* Connections (Visual Lines) */}
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-full h-px bg-gradient-to-r from-transparent via-visa-gold to-transparent opacity-40"></div>
                 <div className="w-px h-full bg-gradient-to-b from-transparent via-visa-blue to-transparent opacity-40"></div>
                 
                 {/* Floating Points */}
                 {[...Array(16)].map((_, i) => (
                    <div 
                      key={i} 
                      className="absolute w-3 h-3 rounded-full bg-white border border-visa-navy group cursor-pointer hover:bg-visa-gold transition-all"
                      style={{ 
                        left: `${50 + (Math.cos(i * (Math.PI/8)) * 35)}%`, 
                        top: `${50 + (Math.sin(i * (Math.PI/8)) * 35)}%`,
                        opacity: 0.6
                      }}
                    >
                       <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 bg-visa-navy text-white text-[8px] p-2 rounded-lg font-black whitespace-nowrap shadow-xl">
                          Agent_{i+10}02_Valid
                       </div>
                    </div>
                 ))}
              </div>
           </div>
           <p className="text-visa-navy/20 text-[10px] uppercase font-black mt-16 tracking-[0.2em] flex items-center gap-2">
            Verified Secure by <span className="vorn-logo text-[10px] text-visa-navy opacity-50"><span className="v-letter">V</span>ORN</span> Elite Protocols
           </p>
        </div>

        {/* Global Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
           <div className="bg-white p-10 rounded-[40px] border border-visa-border shadow-xl">
              <h4 className="text-visa-navy font-black text-2xl tracking-tighter mb-8 uppercase flex items-center gap-3">
                <i className="fa-solid fa-shield-halved text-visa-gold project-logo-animate"></i>
                Certification Vault
              </h4>
              <div className="space-y-5 mb-10">
                 {['Regulatory Proof Pack', 'VORN Network Log v4', 'Agent Trace JSON', 'EvoShield Compliance Seal'].map(item => (
                   <div key={item} className="flex items-center gap-4 text-sm text-visa-navy/70 font-bold uppercase">
                      <div className="w-6 h-6 rounded-full bg-visa-blue/10 text-visa-blue flex items-center justify-center text-[10px]"><i className="fa-solid fa-check"></i></div>
                      {item}
                   </div>
                 ))}
              </div>
              <button className="w-full py-6 bg-visa-navy text-white font-black rounded-3xl shadow-2xl hover:bg-visa-blue transition-all text-xl italic uppercase tracking-tighter">
                 Export Audit ZIP
              </button>
           </div>

           <div className="grid grid-cols-2 gap-6">
              <div className="bg-visa-platinum p-8 rounded-[35px] border border-visa-border flex flex-col justify-center items-center text-center shadow-sm">
                 <div className="text-[10px] text-visa-navy/30 font-black uppercase mb-3">Total Variants</div>
                 <div className="text-5xl font-black text-visa-navy italic tracking-tighter">154</div>
              </div>
              <div className="bg-visa-platinum p-8 rounded-[35px] border border-visa-border flex flex-col justify-center items-center text-center shadow-sm">
                 <div className="text-[10px] text-visa-navy/30 font-black uppercase mb-3">Integrity</div>
                 <div className="text-5xl font-black text-green-600 italic tracking-tighter">99<span className="text-3xl">%</span></div>
              </div>
              <div className="col-span-2 bg-visa-navy text-white p-8 rounded-[35px] shadow-2xl">
                 <div className="flex justify-between items-center mb-6">
                    <h5 className="text-visa-gold text-[10px] font-black uppercase tracking-[0.3em]">Precision Dial</h5>
                    <span className="text-[10px] font-mono text-white/40 font-bold">MODE: ELITE</span>
                 </div>
                 <input type="range" className="w-full accent-visa-gold h-2 rounded-full appearance-none bg-white/10" min="1" max="100" />
                 <div className="flex justify-between text-[9px] text-white/30 font-black uppercase mt-4">
                    <span>Low Res</span>
                    <span>High Fidelity</span>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-8 bg-white/95 backdrop-blur-2xl border-t border-visa-border z-40">
         <div className="max-w-6xl mx-auto flex flex-wrap gap-6 justify-center">
            <button onClick={() => navigate('/input')} className="px-12 py-5 border-4 border-visa-navy text-visa-navy font-black rounded-2xl hover:bg-visa-navy hover:text-white transition-all italic text-lg shadow-xl shadow-visa-navy/5">
               Cycle Shielding
            </button>
            <button className="px-12 py-5 bg-visa-blue text-white font-black rounded-2xl shadow-2xl hover:brightness-110 transition-all italic text-lg tracking-tighter uppercase">
               Synchronize VORN Hub
            </button>
         </div>
      </div>
    </div>
  );
};
