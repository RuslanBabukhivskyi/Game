import React, { useState, useEffect } from 'react';
// ПРАВИЛЬНИЙ ІМПОРТ ПРОВАЙДЕРА:
import { GameProvider, useGame } from './context/GameContext'; 

import LoginScreen from './components/LoginScreen';
import Window from './components/Window';
import Browser from './apps/Browser';
import Terminal from './apps/Terminal';
import Notes from './apps/Notes';
import Tasks from './apps/Tasks';
import Shop from './apps/Shop';
import Profile from './apps/Profile';
import { Monitor, Globe, FileText, CheckSquare, ShoppingCart, User } from 'lucide-react';
import './styles/Theme.css';
import './styles/Desktop.css';

const Desktop = () => {
  const { role } = useGame();
  
  // === ЛОГІКА ДИНАМІЧНОЇ ТЕМИ ===
  useEffect(() => {
      // Отримуємо кореневий елемент документа (:root у CSS)
      const root = document.documentElement;

      if (role === 'black') {
          // Якщо роль ЧОРНА: перезаписуємо синю змінну на червону
          // Використовуємо значення, які вже є в Theme.css
          root.style.setProperty('--accent-blue', 'var(--accent-red)');
          // Також змінюємо колір світіння
          root.style.setProperty('--glow-blue', 'var(--glow-red)');
      } else {
          // Якщо роль БІЛА (або ще не вибрана): скидаємо до оригінальних синіх значень
          // (Ці значення взяті з твого Theme.css)
          root.style.setProperty('--accent-blue', '#38BDF8');
          root.style.setProperty('--glow-blue', '0 0 10px #38BDF8');
      }

      // Функція очистки: скидаємо стилі при розмонтуванні компонента
      return () => {
          root.style.removeProperty('--accent-blue');
          root.style.removeProperty('--glow-blue');
      };
  }, [role]); // Цей ефект спрацьовує щоразу, коли змінюється 'role'
  // ==============================


  const [windows, setWindows] = useState({
    tasks: true,
    browser: true,
    terminal: true,
    notes: true,
    shop: false,
    profile: false
  });
  
  const [activeWindow, setActiveWindow] = useState('browser');

  if (!role) return <LoginScreen />;

  const toggleWindow = (name) => {
    setWindows(prev => {
      const newState = { ...prev, [name]: !prev[name] };
      if (newState[name]) setActiveWindow(name);
      return newState;
    });
  };

  const focusWindow = (name) => setActiveWindow(name);

  return (
    <div className="desktop-container">
      <div className="desktop-area">
        
        <Window title="Mission Control" isOpen={windows.tasks} onClose={() => toggleWindow('tasks')} isActive={activeWindow === 'tasks'} onFocus={() => focusWindow('tasks')} defaultPos={{ x: 20, y: 20, width: 300, height: 400 }}>
          <Tasks />
        </Window>

        <Window title="Browser" isOpen={windows.browser} onClose={() => toggleWindow('browser')} isActive={activeWindow === 'browser'} onFocus={() => focusWindow('browser')} defaultPos={{ x: 340, y: 20, width: 600, height: 450 }}>
          <Browser />
        </Window>

        <Window title="Hacker Notes" isOpen={windows.notes} onClose={() => toggleWindow('notes')} isActive={activeWindow === 'notes'} onFocus={() => focusWindow('notes')} defaultPos={{ x: 960, y: 20, width: 280, height: 350 }}>
          <Notes />
        </Window>

        <Window title="DarkNet Shop" isOpen={windows.shop} onClose={() => toggleWindow('shop')} isActive={activeWindow === 'shop'} onFocus={() => focusWindow('shop')} defaultPos={{ x: 340, y: 100, width: 300, height: 400 }}>
          <Shop />
        </Window>

        <Window title="Your Profile" isOpen={windows.profile} onClose={() => toggleWindow('profile')} isActive={activeWindow === 'profile'} onFocus={() => focusWindow('profile')} defaultPos={{ x: 660, y: 100, width: 280, height: 350 }}>
          <Profile />
        </Window>

        <Window title="Terminal" isOpen={windows.terminal} onClose={() => toggleWindow('terminal')} isActive={activeWindow === 'terminal'} onFocus={() => focusWindow('terminal')} defaultPos={{ x: 20, y: 440, width: 600, height: 250 }}>
          <Terminal />
        </Window>

      </div>

      <div className="dock-bar">
        <DockIcon icon={<CheckSquare size={20}/>} onClick={() => toggleWindow('tasks')} active={windows.tasks} label="Tasks" />
        <DockIcon icon={<Globe size={20}/>} onClick={() => toggleWindow('browser')} active={windows.browser} label="Browser" />
        <DockIcon icon={<Monitor size={20}/>} onClick={() => toggleWindow('terminal')} active={windows.terminal} label="Terminal" />
        <DockIcon icon={<FileText size={20}/>} onClick={() => toggleWindow('notes')} active={windows.notes} label="Notes" />
        
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