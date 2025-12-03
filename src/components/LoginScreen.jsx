import React from 'react';
import { useGame } from '../context/GameContext';
import { Shield, Skull } from 'lucide-react';
import '../styles/Login.css';

const LoginScreen = () => {
  const { selectRole } = useGame();

  return (
    <div className="login-container">
        <h1 className="login-title">WHITE HAT ACADEMY</h1>
        
        <div className="role-selection">
            {/* WHITE HAT */}
            <div onClick={() => selectRole('white')} className="role-card role-white">
                <Shield size={64} color="var(--accent-blue)" style={{ marginBottom: '20px' }}/>
                <h2 style={{ color: 'var(--accent-blue)' }}>WHITE HAT</h2>
                <p className="role-desc">
                    Легальна робота. Аудит, захист, контракти.
                </p>
            </div>

            {/* BLACK HAT */}
            <div onClick={() => selectRole('black')} className="role-card role-black">
                <Skull size={64} color="var(--accent-red)" style={{ marginBottom: '20px' }}/>
                <h2 style={{ color: 'var(--accent-red)' }}>BLACK HAT</h2>
                <p className="role-desc">
                    Нелегал. Експлойти, злам, анонімність.
                </p>
            </div>
        </div>
    </div>
  );
};

export default LoginScreen;