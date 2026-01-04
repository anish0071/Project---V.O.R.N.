
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Layout';
import { fetchMetrics, fetchRecentEvolutions, fetchAgents } from '../services/api';
import { EvolutionMetrics, EvolutionRecord, Agent } from '../types';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState<EvolutionMetrics | null>(null);
  const [history, setHistory] = useState<EvolutionRecord[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);

  useEffect(() => {
    fetchMetrics().then(setMetrics);
    fetchRecentEvolutions().then(setHistory);
    fetchAgents().then(setAgents);
  }, []);

  return (
    <div className="min-h-screen pb-24">
      <Header />
      
      {/* Hero Section - Clean Professional */}
      <section className="py-20 px-8 md:px-16 flex flex-col md:flex-row items-center gap-12 bg-white border-b border-visa-border">
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-3">
             <i className="fa-solid fa-shield-halved text-visa-gold text-2xl project-logo-animate"></i>
             <span className="text-visa-navy font-black uppercase text-xs tracking-widest">Ecosystem Integrity Protocol</span>
          </div>
          <h2 className="text-visa-navy text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter">
            Evolve <span className="text-visa-blue">Compliance</span> <br/> 
            <span className="vorn-logo text-5xl md:text-7xl italic">
              <span className="v-letter">V</span>ORN <span className="text-visa-gold ml-4">Elite.</span>
            </span>
          </h2>
          <p className="text-visa-navy/60 text-lg md:text-xl max-w-xl font-medium leading-relaxed">
            Real-time PCI & PII evolution for Global Partners. Autonomous agentic shielding at network scale powered by the VORN Ecosystem.
          </p>
          <div className="flex gap-4 pt-4">
             <button onClick={() => navigate('/input')} className="visa-btn-primary px-10 py-4 rounded-xl font-bold text-lg shadow-xl shadow-visa-navy/10">
                Initiate Evolution
             </button>
             <button className="bg-white border-2 border-visa-navy text-visa-navy px-10 py-4 rounded-xl font-bold text-lg hover:bg-visa-platinum transition-all">
                View Audit Log
             </button>
          </div>
        </div>
        <div className="hidden lg:block flex-1 relative h-64">
           {/* Abstract VORN Decorative Shape */}
           <div className="absolute top-0 right-0 w-80 h-48 bg-visa-navy rounded-3xl transform rotate-6 flex items-center justify-center shadow-2xl overflow-hidden">
              <div className="text-white/10 text-9xl font-black rotate-12">VORN</div>
              <div className="absolute top-5 left-5 w-10 h-8 bg-visa-gold rounded-md"></div>
              <div className="absolute bottom-5 right-10 opacity-20 project-logo-animate">
                <i className="fa-solid fa-shield-halved text-white text-8xl"></i>
              </div>
           </div>
        </div>
      </section>

      {/* Metrics Section - Light Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 md:px-16 -mt-10">
        {[
          { label: 'Ecosystem Health', value: metrics?.compliance_score ? `${metrics.compliance_score}%` : '-- %', color: 'text-visa-blue' },
          { label: 'Network Latency', value: metrics?.latency_ms ? `${metrics.latency_ms}ms` : '-- ms', color: 'text-visa-navy' },
          { label: 'Data Protected', value: metrics?.audit_reduction_pct ? `${metrics.audit_reduction_pct}%` : '-- %', color: 'text-visa-gold' },
        ].map((card, i) => (
          <div key={i} className="bg-white p-8 rounded-2xl border border-visa-border shadow-xl shadow-gray-200/50 hover:shadow-2xl transition-all">
            <h3 className="text-visa-navy/40 text-[10px] uppercase font-black tracking-widest mb-4">{card.label}</h3>
            <p className={`${card.color} text-5xl font-black tracking-tighter`}>{card.value}</p>
            <div className="flex items-center gap-1 mt-4 text-green-600 font-bold text-xs">
               <i className="fa-solid fa-arrow-up"></i>
               <span>2.4% vs Last Audit</span>
            </div>
          </div>
        ))}
      </div>

      {/* Agents Grid */}
      <div className="px-8 md:px-16 mt-20">
        <div className="flex justify-between items-end mb-10">
           <div>
              <h3 className="text-visa-navy text-2xl font-black tracking-tighter mb-2">Active Compliance Nodes</h3>
              <p className="text-visa-navy/40 text-sm font-medium">Monitoring global transaction integrity across 5 zones.</p>
           </div>
           <button className="text-visa-blue font-bold text-sm hover:underline">Manage Swarm <i className="fa-solid fa-arrow-right ml-1"></i></button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {agents.map(agent => (
            <div key={agent.id} className="bg-white border border-visa-border p-6 rounded-2xl hover:border-visa-gold transition-all group">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-visa-platinum flex items-center justify-center text-visa-blue group-hover:bg-visa-gold group-hover:text-visa-navy transition-colors">
                  <i className={`fa-solid ${agent.icon}`}></i>
                </div>
                <span className="text-visa-navy text-xs font-black uppercase truncate">{agent.name}</span>
              </div>
              <div className="space-y-3">
                 <div className="flex justify-between text-[10px] font-bold uppercase">
                    <span className="text-visa-navy/30">Node State</span>
                    <span className="text-visa-blue">{agent.status}</span>
                 </div>
                 <div className="w-full bg-visa-platinum h-2 rounded-full overflow-hidden">
                    <div className="bg-visa-navy h-full" style={{ width: `${agent.load}%` }}></div>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
