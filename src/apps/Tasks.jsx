import React, { useState } from 'react';

// ПРАВИЛЬНІ ІМПОРТИ (РОЗДІЛЕНІ):
import { useGame } from '../context/GameContext'; // Логіка з Context
import { getMissions } from '../context/gameData'; // Дані з Data

import { AlertTriangle, Info } from 'lucide-react';
import '../styles/Apps.css';

const Tasks = () => {
  const { 
    role, level, setActiveMission, activeMission, 
    switchMissionWithPenalty, completedMissionIds, isMissionCompleting 
  } = useGame();
  
  // Отримуємо місії з файлу даних
  const allMissions = getMissions(role);
  
  // Фільтрація
  const availableMissions = allMissions.filter(m => 
      m.minLevel <= level && !completedMissionIds.includes(m.id)
  );

  const [showWarning, setShowWarning] = useState(false);
  const [pendingMission, setPendingMission] = useState(null);

  const handleTryAccept = (mission) => {
      if (activeMission && activeMission.id !== mission.id) {
          setPendingMission(mission);
          setShowWarning(true);
      } else {
          setActiveMission(mission);
      }
  };

  const confirmSwitch = () => {
      if (pendingMission) {
          switchMissionWithPenalty(pendingMission);
          setShowWarning(false);
          setPendingMission(null);
      }
  };

  return (
    <div style={{ position: 'relative', height: '100%' }}>
      
      {/* Модальне вікно штрафу */}
      {showWarning && (
          <div className="penalty-overlay">
              <div className="penalty-box">
                  <AlertTriangle size={40} color="var(--accent-red)" style={{marginBottom: '10px'}}/>
                  <h3 style={{color: 'var(--accent-red)', margin: '0 0 10px 0'}}>WARNING</h3>
                  <p style={{fontSize: '13px', marginBottom: '15px'}}>
                      Ви не виконали роботу!<br/>
                      З вас буде знято <strong>200 HC</strong>.
                  </p>
                  <div style={{display: 'flex', gap: '10px'}}>
                      <button className="btn-danger" onClick={confirmSwitch}>Сплатити та змінити</button>
                      <button className="btn-secondary" onClick={() => setShowWarning(false)}>Скасувати</button>
                  </div>
              </div>
          </div>
      )}

      {/* Активна місія */}
      {activeMission && (
        <div className={`mission-card mission-active ${isMissionCompleting ? 'mission-exit' : ''}`}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                <div>
                    <h4 style={{ color: 'var(--accent-green)', margin: '0 0 5px 0' }}>ACTIVE MISSION</h4>
                    <b>{activeMission.title}</b>
                </div>
                <div className="hint-icon-container">
                    <Info size={18} color="var(--code-yellow)" style={{cursor: 'help'}} />
                    <div className="hint-tooltip">
                        <strong>HINT:</strong><br/>
                        {activeMission.hint}
                    </div>
                </div>
            </div>
            <p style={{ fontSize: '12px', margin: '10px 0', lineHeight: '1.4' }}>{activeMission.desc}</p>
        </div>
      )}

      <h4 style={{ color: 'var(--text-muted)', marginTop: '20px' }}>
          Available Jobs ({availableMissions.length})
      </h4>
      
      {availableMissions.length === 0 && !activeMission && (
          <div style={{textAlign: 'center', marginTop: '40px', color: '#666', fontSize: '12px'}}>
              No contracts available.<br/>Wait for updates or level up.
          </div>
      )}

      <div style={{ paddingBottom: '20px' }}>
        {availableMissions.map(mission => (
            <div key={mission.id} className="mission-card">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 'bold', color: 'var(--accent-blue)' }}>{mission.img} {mission.employer}</span>
                    <span style={{ color: 'var(--code-yellow)' }}>{mission.reward} HC</span>
                </div>
                <h4 style={{ margin: '5px 0' }}>{mission.title}</h4>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{mission.desc}</p>
                
                <button 
                    onClick={() => handleTryAccept(mission)} 
                    disabled={activeMission?.id === mission.id}
                    className="btn-primary"
                    style={{ 
                        marginTop: '10px', 
                        background: activeMission?.id === mission.id ? '#334155' : 'var(--accent-blue)',
                        cursor: activeMission?.id === mission.id ? 'default' : 'pointer'
                    }}
                >
                    {activeMission?.id === mission.id ? 'IN PROGRESS' : 'ACCEPT JOB'}
                </button>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;