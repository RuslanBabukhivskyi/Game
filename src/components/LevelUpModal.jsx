import React from 'react';
import '../styles/Apps.css';

const LevelUpModal = ({ oldLevel, newLevel, reward, onClose }) => {
  return (
    <div className="levelup-overlay" onClick={onClose}>
      <div className="levelup-box" onClick={e => e.stopPropagation()}>
        
        <h1 className="levelup-title">SYSTEM UPGRADE</h1>
        
        <div className="levelup-levels">
            <span className="lvl-old">Level {oldLevel}</span>
            <span className="lvl-arrow">➜</span>
            <span className="lvl-new">Level {newLevel}</span>
        </div>

        <div className="levelup-reward">
            REWARD: <span style={{color: 'var(--code-yellow)'}}>{reward} HC</span>
        </div>

        <button className="levelup-btn " onClick={onClose}>
            Claim
        </button>
        
      </div>
    </div>
  );
};

export default LevelUpModal;