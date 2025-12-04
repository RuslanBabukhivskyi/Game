import React from 'react';
import { useGame } from '../context/GameContext';
import { EXPLOITS, WALLPAPERS } from '../context/gameData'; 
import { ShoppingCart, Unlock, Monitor, Image as ImageIcon } from 'lucide-react';
import '../styles/Apps.css';

const Shop = () => {
  const { coins, inventory, buyExploit, ownedWallpapers, activeWallpaperId, buyWallpaper, equipWallpaper } = useGame();

  return (
    <div>
      <div style={{ padding: '10px', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between', position: 'sticky', top: 0, background: 'var(--panel-bg)', zIndex: 10 }}>
        <span style={{ color: 'var(--text-muted)' }}>Wallet:</span>
        <span style={{ color: 'var(--code-yellow)', fontWeight: 'bold' }}>{coins} HC</span>
      </div>
      
      <div style={{ padding: '10px' }}>
        
        <h4 style={{color: 'var(--accent-blue)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '5px'}}>
            <Monitor size={14}/> SOFTWARE
        </h4>
        
        <div style={{ marginBottom: '20px' }}>
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

        <h4 style={{color: 'var(--accent-purple)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '5px'}}>
            <ImageIcon size={14}/> DESKTOP
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {WALLPAPERS.map(wp => {
                const isOwned = ownedWallpapers.includes(wp.id);
                const isActive = activeWallpaperId === wp.id;

                return (
                    <div key={wp.id} style={{ 
                        border: isActive ? '1px solid var(--accent-green)' : '1px solid #334155', 
                        borderRadius: '8px', overflow: 'hidden', background: 'rgba(0,0,0,0.2)' 
                    }}>
                        <div style={{ height: '60px', background: wp.src ? `url(${wp.src}) center/cover` : '#333' }}>
                            {!wp.src && <div style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'10px', color:'#777'}}>Default</div>}
                        </div>
                        
                        <div style={{ padding: '8px' }}>
                            <div style={{ fontSize: '11px', fontWeight: 'bold', marginBottom: '2px' }}>{wp.name}</div>
                            <div style={{ fontSize: '9px', color: 'var(--text-muted)', marginBottom: '5px' }}>{wp.price === 0 ? 'Free' : `${wp.price} HC`}</div>
                            
                            {isActive ? (
                                <button disabled style={{ width: '100%', padding: '4px', fontSize: '10px', background: 'var(--accent-green)', color: '#000', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}>ACTIVE</button>
                            ) : isOwned ? (
                                <button onClick={() => equipWallpaper(wp.id)} style={{ width: '100%', padding: '4px', fontSize: '10px', background: '#334155', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>EQUIP</button>
                            ) : (
                                <button onClick={() => buyWallpaper(wp.id)} disabled={coins < wp.price} style={{ width: '100%', padding: '4px', fontSize: '10px', background: 'var(--accent-blue)', color: '#000', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>BUY</button>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>

      </div>
    </div>
  );
};

export default Shop;