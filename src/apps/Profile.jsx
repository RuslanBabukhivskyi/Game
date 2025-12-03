import React from 'react';
import { useGame } from '../context/GameContext';
import { User } from 'lucide-react';
import '../styles/Apps.css';

const Profile = () => {
  const { role, coins, level, xp } = useGame();
  const nextLevelXp = level * 100;
  const progressPercent = Math.min((xp / nextLevelXp) * 100, 100);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
        
        <div className={`profile-avatar ${role === 'white' ? 'avatar-white' : 'avatar-black'}`}>
            <User size={40} color="#000" />
        </div>
        
        <h2>{role === 'white' ? 'White Hat' : 'Black Hat'}</h2>
        <div style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Level {level} Operator</div>
        
        <div className="stats-box">
            <div style={{ marginBottom: '10px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Funds:</span>
                <span style={{ float: 'right', color: 'var(--code-yellow)', fontWeight: 'bold' }}>{coins} HC</span>
            </div>
            
            <div>
                <span style={{ color: 'var(--text-muted)' }}>XP:</span>
                <span style={{ float: 'right' }}>{xp} / {nextLevelXp}</span>
                <div style={{ width: '100%', height: '6px', background: '#333', borderRadius: '3px', marginTop: '5px' }}>
                    <div style={{ width: `${progressPercent}%`, height: '100%', background: 'var(--accent-green)', borderRadius: '3px', transition: 'width 0.5s' }}></div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Profile;