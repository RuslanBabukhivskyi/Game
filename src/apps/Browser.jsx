import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { RotateCw, AlertTriangle } from 'lucide-react';
import '../styles/Apps.css';

const Browser = () => {
  const { activeMission, completeMission, addLog } = useGame();
  const [inputVal, setInputVal] = useState('');
  const [siteMsg, setSiteMsg] = useState('');
  const [serverStatus, setServerStatus] = useState(200); // 200, 403, 500
  const [isGlitching, setIsGlitching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const targetUrl = activeMission ? activeMission.targetUrl : 'http://blocked.local';

  const handleHack = (e) => {
    e.preventDefault();
    if (!activeMission) {
        setSiteMsg("ERROR: Connection Refused. No active target.");
        return;
    }

    setIsLoading(true);
    setSiteMsg("Sending packet...");
    addLog(`[NET] POST ${targetUrl} payload="${inputVal}"`, 'info');

    // Симуляція затримки мережі
    setTimeout(() => {
        setIsLoading(false);

        // 1. Перевірка: Чи взагалі щось введено?
        if (!inputVal) {
            setSiteMsg("Server Error: Empty request body.");
            setServerStatus(400);
            return;
        }

        // 2. ГОЛОВНА ПЕРЕВІРКА: Використовуємо функцію validation з місії
        // Це дозволяє робити унікальні вимоги для кожної місії
        const isSuccess = activeMission.validation(inputVal);

        if (isSuccess) {
            // УСПІХ
            setIsGlitching(true);
            setServerStatus(200);
            setSiteMsg(`[SYSTEM CRITICAL] Exploitation Successful! Root access granted.`);
            addLog(`[HACK] Payload accepted. Shell opened.`, 'success');
            
            setTimeout(() => {
                completeMission();
                setIsGlitching(false);
                setSiteMsg("");
                setInputVal("");
            }, 2000);

        } else {
            // НЕВДАЧА - даємо гравцю підказку чому
            setServerStatus(500); // Internal Server Error
            
            // Розумні повідомлення про помилку
            if (activeMission.type === 'SQL_INJECTION' && !inputVal.includes("'")) {
                setSiteMsg("DB Error: Syntax looks normal. Try breaking the query string.");
            } else if (activeMission.type === 'XSS' && !inputVal.includes("<script>")) {
                setSiteMsg("WAF: No executable script detected.");
            } else {
                setSiteMsg("Server Response: 403 Forbidden. Payload ineffective.");
            }
            
            addLog(`[FAIL] Target rejected payload.`, 'error');
        }
    }, 800);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }} className={isGlitching ? 'glitch-effect' : ''}>
      {/* Адресний рядок */}
      <div className="browser-bar">
        <RotateCw size={16} color={isLoading ? "var(--code-yellow)" : "var(--accent-blue)"} className={isLoading ? "spin" : ""} />
        <input className="url-input" value={targetUrl} readOnly />
      </div>

      {/* Вікно сайту */}
      <div className="site-viewport" style={{ 
          background: serverStatus === 200 ? '#fff' : '#f8d7da', // Червонуватий фон при помилці
          transition: 'background 0.3s'
      }}>
        {!activeMission ? (
            <div style={{textAlign: 'center', opacity: 0.5}}>
                <AlertTriangle size={48} style={{margin: '0 auto 10px'}}/>
                <h3>Secure Gateway</h3>
                <p>No active connection established.</p>
            </div>
        ) : (
            <>
                <div style={{textAlign: 'center', marginBottom: '20px'}}>
                    <h2 style={{ color: '#000' }}>{activeMission.title} Login</h2>
                    <p style={{ fontSize: '12px', color: '#666' }}>Secure Enterprise Server v4.0</p>
                </div>
                
                <form onSubmit={handleHack} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '280px' }}>
                  {/* Симуляція різних полів залежно від місії */}
                  {activeMission.type === 'IDOR' ? (
                       <div style={{display: 'flex', alignItems: 'center', background: '#eee', padding: '5px', borderRadius: '4px', border: '1px solid #ccc'}}>
                           <span style={{color: '#666', fontSize: '12px', marginRight: '5px'}}>http://site/profile</span>
                           <input 
                                type="text" 
                                placeholder="?id=..." 
                                className="url-input"
                                style={{ background: 'transparent', border: 'none', color: '#000', padding: 0 }} 
                                value={inputVal} onChange={(e) => setInputVal(e.target.value)}
                           />
                       </div>
                  ) : (
                      <input 
                        type="text" 
                        placeholder={activeMission.type === 'XSS' ? "Leave a comment..." : "Username / Command"} 
                        className="url-input"
                        style={{ background: '#fff', border: '1px solid #ccc', color: '#000', padding: '12px' }} 
                        value={inputVal} onChange={(e) => setInputVal(e.target.value)}
                      />
                  )}
                  
                  <button type="submit" className="btn-primary" disabled={isLoading}>
                    {isLoading ? "SENDING..." : "INJECT PAYLOAD"}
                  </button>
                </form>

                {siteMsg && (
                    <div style={{ 
                        marginTop: '20px', 
                        padding: '10px', 
                        borderRadius: '4px',
                        background: serverStatus === 200 ? 'rgba(0,128,0,0.1)' : 'rgba(255,0,0,0.1)',
                        color: serverStatus === 200 ? 'green' : '#721c24',
                        border: serverStatus === 200 ? '1px solid green' : '1px solid #f5c6cb',
                        width: '90%',
                        fontSize: '12px',
                        fontFamily: 'JetBrains Mono'
                    }}>
                        <strong> SERVER_LOG:</strong> {siteMsg}
                    </div>
                )}
            </>
        )}
      </div>
    </div>
  );
};

export default Browser;