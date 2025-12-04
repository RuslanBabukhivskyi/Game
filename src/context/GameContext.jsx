import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { EXPLOITS, WALLPAPERS, getMissions } from './gameData';
import LevelUpModal from '../components/LevelUpModal';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [coins, setCoins] = useState(0);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  
  const [inventory, setInventory] = useState(['sqli_basic']); 
  
  const [ownedWallpapers, setOwnedWallpapers] = useState(['wp_default']); 
  const [activeWallpaperId, setActiveWallpaperId] = useState('wp_default'); 

  const [activeMission, setActiveMission] = useState(null);
  const [completedMissionIds, setCompletedMissionIds] = useState([]); 
  const [isMissionCompleting, setIsMissionCompleting] = useState(false);
  
  const [logs, setLogs] = useState([]);
  const [hudText, setHudText] = useState(null); 

  const [showLevelModal, setShowLevelModal] = useState(false);
  const [levelData, setLevelData] = useState({ old: 1, new: 1, reward: 0 });

  const availableMissionsCount = useMemo(() => {
      if (!role) return 0;
      const all = getMissions(role);
      return all.filter(m => m.minLevel <= level && !completedMissionIds.includes(m.id)).length;
  }, [role, level, completedMissionIds]);

  useEffect(() => {
      if (role && availableMissionsCount === 0 && !activeMission) {
          setHudText("Місій немає. Можна відпочити.");
      } else if (role && availableMissionsCount > 0 && !activeMission && hudText === "Місій немає. Можна відпочити.") {
          setHudText(null);
      }
  }, [availableMissionsCount, activeMission, role, hudText]);

  const addLog = (msg, type = 'normal') => {
    setLogs(prev => [...prev, { msg, type, time: new Date().toLocaleTimeString() }]);
  };

  const selectRole = (selectedRole) => {
    setRole(selectedRole);
    addLog(`Identity initialized: ${selectedRole.toUpperCase()} HAT.`);
  };

  const completeMission = () => {
    if (!activeMission) return;
    
    setIsMissionCompleting(true);

    setTimeout(() => {
        setCompletedMissionIds(prev => [...prev, activeMission.id]);
        setCoins(prev => prev + activeMission.reward);
        
        const earnedXp = Math.floor(activeMission.reward * 0.6);
        
        setXp(prev => {
            const newXp = prev + earnedXp;
            const xpThreshold = level * 100; 
            
            if (newXp >= xpThreshold) {
                const nextLvl = level + 1;
                const bonus = 50 * nextLvl;

                setLevelData({ old: level, new: nextLvl, reward: bonus });
                setShowLevelModal(true);

                setLevel(nextLvl);
                setCoins(c => c + bonus); 
                addLog(`⚡ LEVEL UP! PROMOTED TO LEVEL ${nextLvl}`, 'success');
                
                setHudText("З'явилися нові завдання!");
                setTimeout(() => setHudText(null), 5000);

                return newXp - xpThreshold; 
            }
            return newXp;
        });

        addLog(`Mission "${activeMission.title}" COMPLETE. +${activeMission.reward} HC`, 'success');
        
        setActiveMission(null);
        setIsMissionCompleting(false);
        
    }, 500);
  };

  const switchMissionWithPenalty = (newMission) => {
      const PENALTY = 200;
      setCoins(prev => prev - PENALTY);
      addLog(`Mission ABORTED. Penalty: -${PENALTY} HC`, 'error');
      setActiveMission(newMission);
  };

  const buyExploit = (exploitId) => {
    const item = EXPLOITS.find(e => e.id === exploitId);
    if (!item || inventory.includes(item.id)) return;
    
    if (coins >= item.price) {
        setCoins(c => c - item.price);
        setInventory(prev => [...prev, item.id]);
        addLog(`Bought exploit: ${item.name}`, 'info');
    } else {
        addLog(`Not enough HackCoins for ${item.name}`, 'error');
    }
  };

  const buyWallpaper = (wpId) => {
      const wp = WALLPAPERS.find(w => w.id === wpId);
      if (!wp || ownedWallpapers.includes(wpId)) return;

      if (coins >= wp.price) {
          setCoins(c => c - wp.price);
          setOwnedWallpapers(prev => [...prev, wpId]);
          addLog(`Purchased wallpaper: ${wp.name}`, 'info');
      } else {
          addLog(`Not enough HackCoins for ${wp.name}`, 'error');
      }
  };

  const equipWallpaper = (wpId) => {
      if (ownedWallpapers.includes(wpId)) {
          setActiveWallpaperId(wpId);
          addLog(`Desktop background updated.`, 'success');
      }
  };

  return (
    <GameContext.Provider value={{
      role, selectRole, coins, level, xp, inventory, 
      activeMission, setActiveMission, completeMission, switchMissionWithPenalty,
      completedMissionIds, isMissionCompleting, logs, addLog,
      
      buyExploit, 
      
      ownedWallpapers, activeWallpaperId, buyWallpaper, equipWallpaper,

      hudText
    }}>
      {children}
      
      {showLevelModal && (
          <LevelUpModal 
            oldLevel={levelData.old} 
            newLevel={levelData.new} 
            reward={levelData.reward} 
            onClose={() => setShowLevelModal(false)} 
          />
      )}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);