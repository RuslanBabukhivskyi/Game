import React from 'react';
import { useGame } from '../context/GameContext';
import { Shield, Skull } from 'lucide-react';
import whiteMask from '../assets/avatar-white.png'; 
import blackMask from '../assets/avatar-black.png';
import '../styles/Login.css';

const LoginScreen = () => {
  const { selectRole } = useGame();

  return (
    <div className="login-container">
        <h1 className="login-title"><span className='white'>WHITE</span> HAT ACADEMY</h1>
        
        <div className="role-selection">
            <div onClick={() => selectRole('white')} className="role-card role-white">
                <p className="role-desc">Етичний хакінг.<br/>Робота на корпорації.</p>
                <div className="icon-container">
                    <Shield size={80} className="default-icon" color="var(--accent-blue)" />
                    <img src={whiteMask} alt="White Mask" className="mask-reveal" />
                </div>
                <h2 style={{ color: 'var(--accent-blue)' }}>WHITE HAT</h2>
                <div className="glow-corner white-glow"></div>
            </div>

            <div onClick={() => selectRole('black')} className="role-card role-black">
                <p className="role-desc">Кіберзлочинність.<br/>Високий ризик.</p>
                <div className="icon-container">
                    <Skull size={80} className="default-icon" color="var(--accent-red)" />
                    <img src={blackMask} alt="Black Mask" className="mask-reveal" />
                </div>
                <h2 style={{ color: 'var(--accent-red)' }}>BLACK HAT</h2>
                <div className="glow-corner black-glow"></div>
            </div>
        </div>
    </div>
  );
};

export default LoginScreen;