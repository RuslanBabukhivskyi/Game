import React, { useEffect, useRef } from 'react';
import { useGame } from '../context/GameContext';
import '../styles/Apps.css';

const Terminal = () => {
  const { logs } = useGame();
  const endRef = useRef(null);
  
  useEffect(() => { 
      endRef.current?.scrollIntoView({ behavior: "smooth" }); 
  }, [logs]);

  return (
    <div className="terminal">
      <div style={{ color: 'var(--text-muted)', marginBottom: '10px' }}>Kali Linux [v2077] - Initialized...</div>
      
      {logs.map((log, index) => {
        let logClass = '';
        if (log.type === 'error') logClass = 'log-error';
        else if (log.type === 'success') logClass = 'log-success';
        else if (log.type === 'info') logClass = 'log-info';

        return (
            <div key={index} className={logClass}>
              <span className="timestamp">[{log.time}]</span>{log.msg}
            </div>
        )
      })}
      
      <div ref={endRef} />
      <div style={{ marginTop: '5px' }}>root@kali:~$ <span className="glitch-effect">_</span></div>
    </div>
  );
};

export default Terminal;