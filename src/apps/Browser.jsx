import React, { useState, useEffect, useRef } from 'react';
import { useGame } from '../context/GameContext';
import { EXPLOITS } from '../context/gameData'; 
import { RotateCw, Lock, User, Terminal, ChevronRight } from 'lucide-react'; 
import '../styles/Apps.css';

const Browser = () => {
  const { activeMission, completeMission, addLog, inventory } = useGame(); 
  
  const [urlBar, setUrlBar] = useState('');
  const [formValues, setFormValues] = useState({ username: '', password: '', comment: '', search: '', body: '' });
  
  const [siteMsg, setSiteMsg] = useState('');
  const [serverStatus, setServerStatus] = useState(200);
  const [isGlitching, setIsGlitching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [showTools, setShowTools] = useState(false);
  const toolsRef = useRef(null);

  useEffect(() => {
      if (activeMission) {
          setUrlBar(activeMission.targetUrl);
          setFormValues({ username: '', password: '', comment: '', search: '', body: '{ "username": "user", "role": "guest" }' });
          setSiteMsg('');
          setServerStatus(200);
      }
  }, [activeMission]);

  useEffect(() => {
      const handleClickOutside = (event) => {
          if (toolsRef.current && !toolsRef.current.contains(event.target)) {
              setShowTools(false);
          }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const typePayload = (payload, fieldName) => {
      setShowTools(false); 
      let i = 0;
      const speed = 30; 
      
      setFormValues(prev => ({ ...prev, [fieldName]: '' }));

      const interval = setInterval(() => {
          setFormValues(prev => {
              const currentVal = prev[fieldName] || '';
              if (currentVal.length >= payload.length) {
                  clearInterval(interval);
                  return prev;
              }
              return { ...prev, [fieldName]: payload.substring(0, i + 1) };
          });
          i++;
          if (i >= payload.length) clearInterval(interval);
      }, speed);
  };

  const handleHack = (e) => {
    e.preventDefault();
    if (!activeMission) return;

    setIsLoading(true);
    setSiteMsg("Processing request...");

    setTimeout(() => {
        setIsLoading(false);
        let isSuccess = false;
        let payloadForWaf = "";

        if (activeMission.type === 'IDOR') {
            payloadForWaf = urlBar; 
            addLog(`GET ${urlBar}`, 'info');
            isSuccess = activeMission.validation(urlBar);
        } else {
            payloadForWaf = JSON.stringify(formValues); 
            addLog(`POST Payload: ${payloadForWaf}`, 'info');
            isSuccess = activeMission.validation(formValues);
        }

        if (activeMission.waf) {
            const detected = activeMission.waf.find(word => payloadForWaf.toLowerCase().includes(word.toLowerCase()));
            if (detected) {
                setServerStatus(403);
                setSiteMsg(`🔥 WAF BLOCK: Malicious pattern detected: "${detected}"`);
                addLog(`[WAF] Blocked attack pattern: ${detected}`, 'error');
                return;
            }
        }

        if (isSuccess) {
            setIsGlitching(true);
            setServerStatus(200);
            setSiteMsg(`ACCESS GRANTED. Exploitation Successful!`);
            addLog(`[HACK] System compromised.`, 'success');
            setTimeout(() => {
                completeMission();
                setIsGlitching(false);
                setSiteMsg("");
            }, 1500);
        } else {
            setServerStatus(500);
            if (activeMission.type === 'IDOR') setSiteMsg("404 Not Found (User ID valid or generic error)");
            else setSiteMsg("Invalid Credentials / Payload Failed");
            addLog(`[FAIL] Server rejected request.`, 'error');
        }
    }, 800);
  };

  const handleInput = (field, value) => {
      setFormValues(prev => ({ ...prev, [field]: value }));
  };

  // Фільтруємо інструменти: показуємо тільки ті, що є в інвентарі
  // і (опціонально) підходять під тип місії, хоча можна показувати всі для складності
  const myExploits = EXPLOITS.filter(e => inventory.includes(e.id));

  if (!activeMission) return (
      <div className="site-viewport" style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', color:'#666'}}>
          <Lock size={48} style={{marginBottom:10}}/>
          <h3>Secure Connection Closed</h3>
          <p>Select a mission to establish target connection.</p>
      </div>
  );

  const hasBg = !!activeMission.bgImage;
  const browserBodyStyle = hasBg ? {
      backgroundImage: `url(${activeMission.bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
  } : {};

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }} className={isGlitching ? 'glitch-effect' : ''}>
      
      <div className="browser-bar">
        <RotateCw size={16} className={isLoading ? "spin" : ""} color="var(--accent-blue)"/>
        <input 
            className="url-input" 
            value={urlBar}
            onChange={(e) => setUrlBar(e.target.value)}
            style={activeMission.type === 'IDOR' ? {border: '1px solid var(--code-yellow)', color: '#fff'} : {}}
        />
        {activeMission.type === 'IDOR' && <button onClick={handleHack} className="btn-go">GO</button>}
      </div>

      <div 
        className="site-viewport" 
        key={activeMission.id} 
        style={{ ...browserBodyStyle, backgroundColor: hasBg ? 'transparent' : (serverStatus === 200 ? '#fff' : '#fff0f0') }}
      >
        <div className={hasBg ? 'browser-glass-content' : ''}>
        
            {/* === HELPER: TOOLBAR BUTTON (Кнопка інструментів) === */}
            {/* Вона з'являється тільки якщо це не IDOR (бо IDOR в URL рядку) */}
            {activeMission.uiType !== 'STATIC' && (
                <div className="hacker-toolbar-container" ref={toolsRef}>
                    <button 
                        className="btn-hacker-tools" 
                        onClick={() => setShowTools(!showTools)}
                        title="Inject Payload"
                    >
                        <Terminal size={14} /> PAYLOADS
                    </button>

                    {showTools && (
                        <div className="hacker-tools-dropdown">
                            <div className="tools-header">OWNED EXPLOITS</div>
                            {myExploits.length === 0 ? (
                                <div className="tool-item empty">Inventory empty</div>
                            ) : (
                                myExploits.map(exploit => (
                                    <div 
                                        key={exploit.id} 
                                        className="tool-item"
                                        onClick={() => {
                                            // Визначаємо, в яке поле друкувати, залежно від типу місії
                                            let targetField = 'username'; // Default for Login
                                            if (activeMission.uiType === 'COMMENTS') targetField = 'comment';
                                            if (activeMission.uiType === 'JSON') targetField = 'body';
                                            
                                            typePayload(exploit.code, targetField);
                                        }}
                                    >
                                        <ChevronRight size={12} />
                                        <span>{exploit.name}</span>
                                    </div>
                                ))
                            )}
                            <div className="tools-footer">Buy more in Shop</div>
                        </div>
                    )}
                </div>
            )}
            {/* ================================================= */}

            {/* === UI ТИП: LOGIN === */}
            {activeMission.uiType === 'LOGIN' && (
                <div style={{width: '250px', margin: '0 auto', textAlign: 'center'}}>
                    <h2 style={{color: hasBg ? '#fff' : '#333', textShadow: hasBg ? '0 2px 4px rgba(0,0,0,0.8)' : 'none'}}>
                        {activeMission.title}
                    </h2>
                    
                    <div style={{
                        background: hasBg ? 'rgba(255,255,255,0.1)' : '#f4f4f4',
                        padding: '20px', borderRadius: '8px', 
                        border: hasBg ? '1px solid rgba(255,255,255,0.2)' : '1px solid #ddd'
                    }}>
                        <User size={32} color={hasBg ? "#fff" : "#555"} style={{marginBottom: '15px'}}/>
                        <form onSubmit={handleHack} style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                            <input type="text" placeholder="Username" className="site-input" 
                                value={formValues.username} onChange={e => handleInput('username', e.target.value)}/>
                            <input type="password" placeholder="Password" className="site-input" 
                                value={formValues.password} onChange={e => handleInput('password', e.target.value)}/>
                            <button type="submit" className="btn-primary" disabled={isLoading}>LOGIN</button>
                        </form>
                    </div>
                </div>
            )}

            {/* === UI ТИП: COMMENTS === */}
            {activeMission.uiType === 'COMMENTS' && (
                <div style={{width: '90%', margin: '0 auto'}}>
                    <h2 style={{color: '#fff', borderBottom: '2px solid var(--accent-blue)', textShadow: '0 2px 4px rgba(0,0,0,0.8)'}}>News Feed</h2>
                    <div style={{marginBottom: '20px', color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>
                        <h3>Local Cat Wins Lottery</h3>
                        <p>Residents shocked as Mr. Whiskers buys a boat...</p>
                    </div>
                    <div style={{padding: '15px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', color: '#fff'}}>
                        <h4 style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>Leave a Reply</h4>
                        <form onSubmit={handleHack}>
                            <textarea placeholder="Write your comment..." className="site-input" style={{height: '80px', marginBottom: '10px', width: '100%'}}
                                    value={formValues.comment} onChange={e => handleInput('comment', e.target.value)}/>
                            <button type="submit" className="btn-primary" disabled={isLoading}>POST COMMENT</button>
                        </form>
                    </div>
                </div>
            )}

            {/* === UI ТИП: JSON API === */}
            {activeMission.uiType === 'JSON' && (
                <div style={{width: '90%', height: '80%', display: 'flex', flexDirection: 'column'}}>
                    <h3>API Debugger v1.0</h3>
                    <form onSubmit={handleHack} style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                        <textarea className="site-input" 
                                style={{flex: 1, fontFamily: 'monospace', background: '#282c34', color: '#abb2bf', border: 'none', padding: '15px'}}
                                value={formValues.body} onChange={e => handleInput('body', e.target.value)}/>
                        <button type="submit" className="btn-primary" style={{marginTop: '10px'}} disabled={isLoading}>SEND REQUEST</button>
                    </form>
                </div>
            )}

            {/* === UI ТИП: STATIC === */}
            {activeMission.uiType === 'STATIC' && (
                <div style={{textAlign: 'center', marginTop: '50px'}}>
                    <h1 style={{color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.8)'}}>📄 Booking Details</h1>
                    <p style={{fontSize: '18px', color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>Reservation ID: <strong>{urlBar.split('=')[1] || '???'}</strong></p>
                    <div style={{margin: '20px auto', padding: '20px', border: '1px dashed rgba(255,255,255,0.5)', width: '200px', color: '#fff'}}>
                        (User Data Placeholder)
                    </div>
                    <p style={{color: '#ccc', fontSize: '12px'}}>Edit URL in the address bar above to view other records.</p>
                </div>
            )}

            {siteMsg && (
                <div style={{ 
                    marginTop: '20px', padding: '10px', width: '90%', margin: '20px auto',
                    color: serverStatus === 200 ? 'green' : '#d32f2f', 
                    background: serverStatus === 200 ? '#e8f5e9' : '#ffebee',
                    border: `1px solid ${serverStatus === 200 ? 'green' : '#d32f2f'}`, 
                    fontSize: '12px', fontFamily: 'JetBrains Mono' 
                }}>
                    <strong>SERVER_RESPONSE:</strong> {siteMsg}
                </div>
            )}
        
        </div>
      </div>
    </div>
  );
};

export default Browser;