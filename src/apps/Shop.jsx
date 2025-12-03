import React from 'react';
import { useGame } from '../context/GameContext';
import { EXPLOITS } from '../context/gameData';
import { ShoppingCart, Unlock } from 'lucide-react';
import '../styles/Apps.css';

const Shop = () => {
  const { coins, inventory, buyExploit } = useGame();

  return (
    <div>
      <div style={{ padding: '10px', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ color: 'var(--text-muted)' }}>Wallet:</span>
        <span style={{ color: 'var(--code-yellow)', fontWeight: 'bold' }}>{coins} HC</span>
      </div>
      
      <div style={{ marginTop: '10px' }}>
        {EXPLOITS.map(item => {
          if (item.price === 0) return null;
          const isOwned = inventory.includes(item.id);
          
          return (
            <div key={item.id} className="list-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '12px' }}>{item.name}</div>
                <div style={{ fontSize: '10px', color: 'var(--accent-blue)' }}>{item.type}</div>
              </div>
              
              {isOwned ? (
                <button disabled style={{ background: 'none', border: 'none', color: 'var(--accent-green)', display: 'flex', gap: '5px' }}>
                    <Unlock size={14}/> Owned
                </button>
              ) : (
                <button 
                    onClick={() => buyExploit(item.id)} 
                    className="btn-primary"
                    disabled={coins < item.price}
                    style={{ width: 'auto', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 10px' }}
                >
                  <ShoppingCart size={12} /> {item.price}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Shop;