import React from 'react';
import { Rnd } from 'react-rnd';
import '../styles/Window.css';

const Window = ({ title, children, isOpen, onClose, defaultPos, isActive, onFocus }) => {
  if (!isOpen) return null;

  return (
    <Rnd
      default={defaultPos}
      minWidth={250} 
      minHeight={150} 
      bounds="parent"
      dragHandleClassName="window-header"
      onMouseDown={onFocus}
      style={{ zIndex: isActive ? 100 : 1, display: 'flex', flexDirection: 'column' }} 
    >
      <div className={`window-frame ${isActive ? 'active' : ''}`}>
        
        <div className="window-header">
          <span className="window-title">{title}</span>
          <div className="window-controls">
              <div className="win-btn btn-close" onClick={(e) => { e.stopPropagation(); onClose(); }}></div>
              <div className="win-btn btn-min"></div>
              <div className="win-btn btn-max"></div>
          </div>
        </div>

        <div className="window-content" onMouseDown={(e) => e.stopPropagation()}>
          {children}
        </div>

      </div>
    </Rnd>
  );
};

export default Window;