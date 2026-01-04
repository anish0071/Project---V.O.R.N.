
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Layout';
import { evolveData } from '../services/api';

const JURISDICTIONS = [
  { id: 'gdpr', name: 'Global GDPR', desc: 'Privacy & Data Rights' },
  { id: 'pci', name: 'VISA PCI DSS', desc: 'Security Standard v4.0' },
  { id: 'ccpa', name: 'Regional US', desc: 'California Compliance' },
  { id: 'lgpd', name: 'LATAM Core', desc: 'Brazilian Privacy Node' },
  { id: 'pdpa', name: 'Asia Pacific', desc: 'ASEAN Data Governance' },
];

export const InputGateway: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    card: '',
    expiry: '',
    cvv: '',
    name: '',
    jurisdictions: [] as string[]
  });
  const [isDeploying, setIsDeploying] = useState(false);

  const toggleJurisdiction = (id: string) => {
    setFormData(prev => ({
      ...prev,
      jurisdictions: prev.jurisdictions.includes(id) 
        ? prev.jurisdictions.filter(j => j !== id)
        : [...prev.jurisdictions, id]
    }));
  };

  const handleDeploy = async () => {
    setIsDeploying(true);
    const result = await evolveData({
      card: formData.card,
      name: formData.name,
      expiry: formData.expiry,
      jurisdiction: formData.jurisdictions
    });
    navigate(`/observatory?txn_id=${result.txn_id}`);
  };

  return (
    <div className="min-h-screen bg-visa-platinum pb-40">
      <Header showBack title="Secure Input Gateway" />

      <div className="max-w-6xl mx-auto p-8 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
          <div className="bg-white rounded-3xl p-10 shadow-sm border border-visa-border space-y-8">
            <h4 className="text-visa-navy font-black text-xl tracking-tight">Financial Asset Details</h4>
            <div className="space-y-6">
              <div className="relative">
                <label className="block text-visa-navy/40 text-[10px] uppercase font-black mb-3 tracking-widest">Card Account Number</label>
                <input 
                  type="text" 
                  placeholder="4000 0000 0000 0000"
                  className="w-full bg-visa-platinum/50 border border-visa-border focus:border-visa-blue outline-none p-4 rounded-xl text-visa-navy font-mono text-lg transition-all"
                  value={formData.card}
                  onChange={e => setFormData({...formData, card: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="block text-visa-navy/40 text-[10px] uppercase font-black mb-3 tracking-widest">Valid Thru</label>
                  <input 
                    type="text" 
                    placeholder="MM / YY"
                    className="w-full bg-visa-platinum/50 border border-visa-border focus:border-visa-blue outline-none p-4 rounded-xl text-visa-navy text-lg"
                    value={formData.expiry}
                    onChange={e => setFormData({...formData, expiry: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-visa-navy/40 text-[10px] uppercase font-black mb-3 tracking-widest">Security Code</label>
                  <input 
                    type="password" 
                    placeholder="• • •"
                    className="w-full bg-visa-platinum/50 border border-visa-border focus:border-visa-blue outline-none p-4 rounded-xl text-visa-navy text-lg tracking-widest"
                  />
                </div>
              </div>
              <div>
                <label className="block text-visa-navy/40 text-[10px] uppercase font-black mb-3 tracking-widest">Legal Name on Asset</label>
                <input 
                  type="text" 
                  placeholder="VISA PARTNER IDENTITY"
                  className="w-full bg-visa-platinum/50 border border-visa-border focus:border-visa-blue outline-none p-4 rounded-xl text-visa-navy text-lg uppercase font-bold"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-10 shadow-sm border border-visa-border">
            <h4 className="text-visa-navy font-black text-xl tracking-tight mb-8">Evolution Compliance Filter</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {JURISDICTIONS.map(j => (
                <div 
                  key={j.id} 
                  onClick={() => toggleJurisdiction(j.id)}
                  className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                    formData.jurisdictions.includes(j.id) ? 'border-visa-gold bg-visa-gold/5' : 'border-visa-border hover:border-visa-blue'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                    formData.jurisdictions.includes(j.id) ? 'bg-visa-gold border-visa-gold' : 'border-visa-border'
                  }`}>
                    {formData.jurisdictions.includes(j.id) && <i className="fa-solid fa-check text-visa-navy text-[10px] font-bold"></i>}
                  </div>
                  <div>
                    <div className="text-visa-navy text-sm font-black tracking-tight uppercase">{j.name}</div>
                    <div className="text-visa-navy/40 text-[10px] font-bold">{j.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-visa-navy text-white rounded-3xl p-8 sticky top-24 shadow-2xl space-y-8">
            <div className="flex justify-between items-center">
               <h4 className="text-visa-gold font-black uppercase text-xs tracking-[0.3em]">Analysis Node</h4>
               <span className="bg-green-500 w-2 h-2 rounded-full animate-pulse"></span>
            </div>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-white/40 text-[10px] font-bold uppercase">Auth Chain</span>
                <span className="text-white font-mono font-bold">128-bit ELITE</span>
              </div>
              <div className="space-y-2">
                 <div className="flex justify-between text-[10px] font-bold uppercase">
                    <span className="text-white/40">Shield Confidence</span>
                    <span className="text-visa-gold">99.8%</span>
                 </div>
                 <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-visa-gold h-full w-[95%]"></div>
                 </div>
              </div>
              <p className="text-[10px] text-white/40 leading-relaxed pt-4 border-t border-white/5 font-medium">
                Note: This evolution will be recorded on the Visa Sovereign Audit Log.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-8 bg-white/90 backdrop-blur-xl border-t border-visa-border z-50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
          <button 
            onClick={handleDeploy}
            disabled={isDeploying}
            className="flex-1 py-6 bg-visa-navy text-white font-black rounded-2xl hover:bg-visa-blue active:scale-95 transition-all shadow-2xl text-xl tracking-tighter uppercase disabled:opacity-50"
          >
            {isDeploying ? 'Initializing Evolution Swarm...' : 'Execute Autonomous Shield'}
          </button>
        </div>
      </div>
    </div>
  );
};
