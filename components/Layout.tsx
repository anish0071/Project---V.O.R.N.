
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Header: React.FC<{ title?: string, showBack?: boolean, rightContent?: React.ReactNode }> = ({ 
  title = "EvoShield", 
  showBack = false, 
  rightContent 
}) => {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-visa-border p-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4">
        {showBack && (
          <button onClick={() => navigate(-1)} className="text-visa-navy text-xl mr-2 hover:text-visa-blue transition-colors">
            <i className="fa-solid fa-arrow-left"></i>
          </button>
        )}
        <div className="flex items-center gap-3">
          {/* Custom VORN branding in Visa style */}
          <div className="vorn-logo text-2xl md:text-3xl">
            <span className="v-letter">V</span>ORN
          </div>
          <div className="flex items-center gap-2 border-l border-visa-border pl-3">
            <i className="fa-solid fa-shield-halved text-visa-blue text-xl project-logo-animate"></i>
            <span className="text-visa-navy font-black text-lg md:text-xl tracking-tighter uppercase">{title}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {rightContent || (
          <>
            <div className="hidden md:flex bg-visa-platinum border border-visa-border px-4 py-1.5 rounded-full text-[10px] font-bold items-center gap-2">
              <span className="text-visa-blue">NETWORK:</span>
              <span className="text-visa-navy">VORN_NODE_PRIME</span>
            </div>
            <button className="text-visa-navy text-xl hover:text-visa-blue transition-colors">
              <i className="fa-solid fa-circle-user"></i>
            </button>
          </>
        )}
      </div>
    </header>
  );
};
