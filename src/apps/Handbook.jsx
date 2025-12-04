import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { WIKI_ARTICLES } from '../context/wikiData'; 
import { Book, Lock } from 'lucide-react';
import '../styles/Apps.css';

const Handbook = () => {
  const { level } = useGame();
  const [selectedId, setSelectedId] = useState('roles'); 

  const activeArticle = WIKI_ARTICLES.find(a => a.id === selectedId);

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      
      <div style={{ width: '200px', borderRight: '1px solid #334155', background: 'rgba(0,0,0,0.2)', overflowY: 'auto' }}>
          <div style={{ padding: '10px', color: 'var(--text-muted)', fontSize: '10px', textTransform: 'uppercase' }}>
              Knowledge Base
          </div>
          {WIKI_ARTICLES.map(article => {
              const isLocked = level < article.minLevel;
              const isActive = selectedId === article.id;
              return (
                  <div key={article.id} onClick={() => !isLocked && setSelectedId(article.id)}
                    style={{
                        padding: '10px', cursor: isLocked ? 'not-allowed' : 'pointer',
                        background: isActive ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
                        borderLeft: isActive ? '3px solid var(--accent-blue)' : '3px solid transparent',
                        color: isLocked ? '#555' : (isActive ? 'var(--accent-blue)' : 'var(--text-main)'),
                        display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px'
                    }}
                  >
                      {isLocked ? <Lock size={12}/> : <Book size={12}/>}
                      {article.title}
                  </div>
              );
          })}
      </div>

      <div style={{ flex: 1, padding: '20px', overflowY: 'auto', fontFamily: 'Inter' }}>
          {activeArticle ? (
              <div className="wiki-content">
                  <h1 style={{ color: 'var(--accent-blue)', marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
                      {activeArticle.title}
                  </h1>

                  {activeArticle.images && (
                      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', justifyContent: 'center' }}>
                          <div style={{textAlign: 'center'}}>
                              <img src={activeArticle.images[0]} alt="White" 
                                   style={{width: '100px', borderRadius: '8px', border: '2px solid var(--accent-blue)', boxShadow: '0 0 15px var(--accent-blue)'}}/>
                              <div style={{fontSize:'10px', marginTop:'5px', color:'var(--accent-blue)'}}>WHITE HAT</div>
                          </div>
                          <div style={{textAlign: 'center'}}>
                              <img src={activeArticle.images[1]} alt="Black" 
                                   style={{width: '100px', borderRadius: '8px', border: '2px solid var(--accent-red)', boxShadow: '0 0 15px var(--accent-red)'}}/>
                              <div style={{fontSize:'10px', marginTop:'5px', color:'var(--accent-red)'}}>BLACK HAT</div>
                          </div>
                      </div>
                  )}
                  
                  <div dangerouslySetInnerHTML={{ __html: activeArticle.content }} />
              </div>
          ) : (
              <div style={{color: '#666', textAlign: 'center', marginTop: '50px'}}>Select a topic</div>
          )}
      </div>
    </div>
  );
};

export default Handbook;