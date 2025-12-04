import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { RotateCw, Lock, User } from 'lucide-react';
import '../styles/Apps.css';

const Browser = () => {
  const { activeMission, completeMission, addLog } = useGame();
  
  const [urlBar, setUrlBar] = useState('');
  const [formValues, setFormValues] = useState({ username: '', password: '', comment: '', search: '', body: '' });
  
  const [siteMsg, setSiteMsg] = useState('');
  const [serverStatus, setServerStatus] = useState(200);
  const [isGlitching, setIsGlitching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
      if (activeMission) {
          setUrlBar(activeMission.targetUrl);
          setFormValues({ username: '', password: '', comment: '', search: '', body: '{ "username": "user", "role": "guest" }' });
          setSiteMsg('');
          setServerStatus(200);
      }
  }, [activeMission]);

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
        style={{ 
          ...browserBodyStyle,
          backgroundColor: hasBg ? 'transparent' : (serverStatus === 200 ? '#fff' : '#fff0f0') 
        }}
      >

        <div className={hasBg ? 'browser-glass-content' : ''}>
        
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

            {activeMission.uiType === 'COMMENTS' && (
                <div style={{width: '90%', margin: '0 auto'}}>
                    <h2 style={{color: '#333', borderBottom: '2px solid var(--accent-blue)'}}>News Feed</h2>
                    <div style={{marginBottom: '20px', color: '#555'}}>
                        <h3>Local Cat Wins Lottery</h3>
                        <p>Residents shocked as Mr. Whiskers buys a boat...</p>
                    </div>
                    <div style={{background: '#f9f9f9', padding: '15px', border: '1px solid #eee'}}>
                        <h4>Leave a Reply</h4>
                        <form onSubmit={handleHack}>
                            <textarea placeholder="Write your comment..." className="site-input" style={{height: '80px', marginBottom: '10px', width: '100%'}}
                                    value={formValues.comment} onChange={e => handleInput('comment', e.target.value)}/>
                            <button type="submit" className="btn-primary" disabled={isLoading}>POST COMMENT</button>
                        </form>
                    </div>
                </div>
            )}

            {activeMission.uiType === 'JSON' && (
                <div style={{width: '90%', height: '80%', display: 'flex', flexDirection: 'column'}}>
                    <h3 style={{color: '#333'}}>API Debugger v1.0</h3>
                    <form onSubmit={handleHack} style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                        <textarea className="site-input" 
                                style={{flex: 1, fontFamily: 'monospace', background: '#282c34', color: '#abb2bf', border: 'none', padding: '15px'}}
                                value={formValues.body} onChange={e => handleInput('body', e.target.value)}/>
                        <button type="submit" className="btn-primary" style={{marginTop: '10px'}} disabled={isLoading}>SEND REQUEST</button>
                    </form>
                </div>
            )}

            {activeMission.uiType === 'STATIC' && (
                <div style={{textAlign: 'center', marginTop: '50px'}}>
                    <h1>📄 Booking Details</h1>
                    <p style={{fontSize: '18px', color: '#555'}}>Reservation ID: <strong>{urlBar.split('=')[1] || '???'}</strong></p>
                    <div style={{margin: '20px auto', padding: '20px', border: '1px dashed #ccc', width: '200px'}}>
                        (User Data Placeholder)
                    </div>
                    <p style={{color: '#888', fontSize: '12px'}}>Edit URL in the address bar above to view other records.</p>
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