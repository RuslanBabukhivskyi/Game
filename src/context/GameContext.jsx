import React, { createContext, useState, useContext } from 'react';
// ПРАВИЛЬНИЙ ІМПОРТ: беремо дані з gameData.js
import { EXPLOITS } from './gameData';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [coins, setCoins] = useState(0);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  
  const [inventory, setInventory] = useState(['sqli_basic']); 
  const [activeMission, setActiveMission] = useState(null);
  const [logs, setLogs] = useState([]);
  
  const [completedMissionIds, setCompletedMissionIds] = useState([]); 
  const [isMissionCompleting, setIsMissionCompleting] = useState(false);

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
        // XP = 60% від суми нагороди
        const earnedXp = Math.floor(activeMission.reward * 0.6);
        
        setXp(prev => {
            const newXp = prev + earnedXp;
            const xpThreshold = level * 100; 
            
            if (newXp >= xpThreshold) {
                const nextLvl = level + 1;
                setLevel(nextLvl);
                addLog(`⚡ LEVEL UP! PROMOTED TO LEVEL ${nextLvl}`, 'success');
                const bonus = 50 * nextLvl;
                setCoins(c => c + bonus); 
                addLog(`+${bonus} HC Level Bonus`, 'info');
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

  return (
    <GameContext.Provider value={{
      role, selectRole,
      coins, level, xp,
      inventory, buyExploit,
      activeMission, setActiveMission, completeMission, switchMissionWithPenalty,
      completedMissionIds, isMissionCompleting,
      logs, addLog
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);