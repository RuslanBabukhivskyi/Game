import React from 'react';
import { useGame } from '../context/GameContext';
import { EXPLOITS } from '../context/gameData';
import { Copy } from 'lucide-react';
import '../styles/Apps.css';

const Notes = () => {
  const { inventory, addLog } = useGame();
  const myExploits = EXPLOITS.filter(e => inventory.includes(e.id));

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    addLog(`Copied to clipboard`, 'info');
  };

  return (
    <div>
      <h4 style={{ color: 'var(--text-muted)', marginBottom: '15px' }}>Hacker Cheat Sheet</h4>
      {myExploits.length === 0 ? <div style={{ color: '#666' }}>Inventory empty. Visit Shop.</div> :
        myExploits.map((item) => (
          <div key={item.id} onClick={() => copyCode(item.code)} className="list-item" style={{ borderLeft: `2px solid var(--accent-purple)`, cursor: 'pointer' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.name}</div>
            <div style={{ color: 'var(--code-yellow)', fontFamily: 'JetBrains Mono', marginTop: '4px', display: 'flex', justifyContent: 'space-between' }}>
              <code>{item.code}</code>
              <Copy size={12} />
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default Notes;