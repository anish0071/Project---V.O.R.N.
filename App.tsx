
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { InputGateway } from './pages/InputGateway';
import { Observatory } from './pages/Observatory';
import { AuditFactory } from './pages/AuditFactory';

const TransitionWrapper: React.FC = () => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setIsAnimating(true);
      
      // Page swap happens right when the card is scaled up to 2.5x (covering the screen)
      // For a 1.8s animation, this is exactly 900ms.
      setTimeout(() => {
        setDisplayLocation(location);
      }, 900);
      
      // Complete animation cycle
      setTimeout(() => {
        setIsAnimating(false);
      }, 1800);
    }
  }, [location, displayLocation]);

  return (
    <>
      <div className={`transition-container ${isAnimating ? 'active' : ''}`}>
        <div className={`visa-card-3d ${isAnimating ? 'animate-swipe' : ''}`}>
          <div className="flex justify-between items-start">
             <span className="text-[3vw] font-bold tracking-tight italic opacity-90">VORN Gold</span>
             <i className="fa-solid fa-wifi wireless-icon"></i>
          </div>
          
          <div className="card-chip"></div>
          
          <div className="card-number">4000 1234 5678 9010</div>
          
          <div className="card-footer">
            <div className="card-holder-info">
              <span className="text-[1.5vw] opacity-60 uppercase font-black tracking-widest mb-1">Expires End</span>
              <span className="text-[2.5vw] font-bold tracking-widest text-visa-gold">12/28</span>
              <div className="mt-2 card-holder-name">G. Raymond</div>
            </div>
            <div className="text-right">
              {/* Custom styled logo on card */}
              <div className="vorn-logo" style={{ fontSize: '8vw', color: 'white' }}>
                <span className="v-letter">V</span>ORN
              </div>
              <span className="visa-gold-subtext italic">Elite</span>
            </div>
          </div>
        </div>
      </div>

      <div className={isAnimating ? 'invisible' : 'visible transition-opacity duration-300'}>
        <Routes location={displayLocation}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/input" element={<InputGateway />} />
          <Route path="/observatory" element={<Observatory />} />
          <Route path="/audit" element={<AuditFactory />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-visa-platinum">
        <TransitionWrapper />
      </div>
    </Router>
  );
}

export default App;
