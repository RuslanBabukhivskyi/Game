import React, { useState, useEffect } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { WALLPAPERS } from './context/gameData'; 

import LoginScreen from './components/LoginScreen';
import Window from './components/Window';

// Імпорт програм (Без Notes)
import Browser from './apps/Browser';
import Terminal from './apps/Terminal';
import Tasks from './apps/Tasks';
import Shop from './apps/Shop';
import Profile from './apps/Profile';
import Handbook from './apps/Handbook';

// Прибрав FileText з імпортів
import { Monitor, Globe, CheckSquare, ShoppingCart, User, BookOpen } from 'lucide-react';
import './styles/Theme.css';
import './styles/Desktop.css';

// Картинки масок
import whiteMaskIcon from './assets/avatar-white.png';
import blackMaskIcon from './assets/avatar-black.png';

const Desktop = () => {
  const { role, activeWallpaperId, hudText } = useGame();
  
  // Прибрав notes зі стану
  const [windows, setWindows] = useState({
    tasks: true, 
    browser: true, 
    terminal: true, 
    shop: false, 
    profile: false, 
    handbook: false
  });
  
  const [activeWindow, setActiveWindow] = useState('browser');

  useEffect(() => {
      const root = document.documentElement;
      if (role === 'black') {
          root.style.setProperty('--accent-blue', 'var(--accent-red)');
          root.style.setProperty('--glow-blue', 'var(--glow-red)');
      } else {
          root.style.setProperty('--accent-blue', '#38BDF8');
          root.style.setProperty('--glow-blue', '0 0 10px #38BDF8');
      }
  }, [role]);

  if (!role) return <LoginScreen />;

  const toggleWindow = (name) => {
    setWindows(prev => {
      const isOpening = !prev[name];
      const newState = { ...prev, [name]: isOpening };
      if (isOpening) setActiveWindow(name);
      return newState;
    });
  };

  const focusWindow = (name) => setActiveWindow(name);

  const roleIcon = role === 'white' ? whiteMaskIcon : blackMaskIcon;

  const currentWp = WALLPAPERS.find(w => w.id === activeWallpaperId);
  
  const bgStyle = currentWp && currentWp.src ? {
      backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.6), rgba(15, 23, 42, 0.6)), url(${currentWp.src})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
  } : {};

  return (
    <div className="desktop-container" style={bgStyle}>
      
      {hudText && (
          <div className={`mask-message ${role === 'black' ? 'msg-danger' : ''}`}>
              {hudText}
          </div>
      )}

      <div className={`role-hud-indicator role-${role}`}>
          <img src={roleIcon} alt={`${role} mask`} />
      </div>

      <div className="desktop-area">
        <Window title="Mission Control" isOpen={windows.tasks} onClose={() => toggleWindow('tasks')} isActive={activeWindow === 'tasks'} onFocus={() => focusWindow('tasks')} defaultPos={{ x: 20, y: 20, width: 300, height: 450 }}>
          <Tasks />
        </Window>
        <Window title="CyberFox Browser" isOpen={windows.browser} onClose={() => toggleWindow('browser')} isActive={activeWindow === 'browser'} onFocus={() => focusWindow('browser')} defaultPos={{ x: 340, y: 20, width: 600, height: 450 }}>
          <Browser />
        </Window>
        {/* Вікно Notes видалено */}
        <Window title="DarkNet Shop" isOpen={windows.shop} onClose={() => toggleWindow('shop')} isActive={activeWindow === 'shop'} onFocus={() => focusWindow('shop')} defaultPos={{ x: 340, y: 100, width: 300, height: 400 }}>
          <Shop />
        </Window>
        <Window title="Agent Profile" isOpen={windows.profile} onClose={() => toggleWindow('profile')} isActive={activeWindow === 'profile'} onFocus={() => focusWindow('profile')} defaultPos={{ x: 660, y: 100, width: 280, height: 350 }}>
          <Profile />
        </Window>
        <Window title="Hacker's Handbook" isOpen={windows.handbook} onClose={() => toggleWindow('handbook')} isActive={activeWindow === 'handbook'} onFocus={() => focusWindow('handbook')} defaultPos={{ x: 100, y: 100, width: 600, height: 500 }}>
            <Handbook />
        </Window>
        <Window title="Terminal" isOpen={windows.terminal} onClose={() => toggleWindow('terminal')} isActive={activeWindow === 'terminal'} onFocus={() => focusWindow('terminal')} defaultPos={{ x: 20, y: 480, width: 600, height: 250 }}>
          <Terminal />
        </Window>
      </div>

      <div className="dock-bar">
        <DockIcon icon={<CheckSquare size={20}/>} onClick={() => toggleWindow('tasks')} active={windows.tasks} label="Tasks" />
        <DockIcon icon={<Globe size={20}/>} onClick={() => toggleWindow('browser')} active={windows.browser} label="Browser" />
        <DockIcon icon={<Monitor size={20}/>} onClick={() => toggleWindow('terminal')} active={windows.terminal} label="Terminal" />
        {/* Іконку Notes видалено */}
        <DockIcon icon={<BookOpen size={20}/>} onClick={() => toggleWindow('handbook')} active={windows.handbook} label="Handbook" />
        
        <div className="dock-separator"></div>
        
        <DockIcon icon={<ShoppingCart size={20}/>} onClick={() => toggleWindow('shop')} active={windows.shop} label="Shop" />
        <DockIcon icon={<User size={20}/>} onClick={() => toggleWindow('profile')} active={windows.profile} label="Profile" />
      </div>
    </div>
  );
};

const DockIcon = ({ icon, onClick, active, label }) => (
  <div onClick={onClick} className={`dock-icon ${active ? 'active' : ''}`}>
    {icon}
    <span className="tooltip">{label}</span>
  </div>
);

export default function App() {
  return (
    <GameProvider>
      <Desktop />
    </GameProvider>
  );
}