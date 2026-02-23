import React from 'react';

interface ControlsProps {
    isAntigravity: boolean;
    onToggle: () => void;
    hasError: boolean;
}

export const Controls: React.FC<ControlsProps> = ({ isAntigravity, onToggle, hasError }) => {
    if (hasError) return null;

    return (
        <div className="controls-overlay">
            <div className="glass-panel">
                <h1 className="title">
                    Physics Engine
                    <span className="badge">{isAntigravity ? 'Anti-G' : 'Gravity'}</span>
                </h1>
                <p className="description">
                    Toggle the system to reverse the gravitational pull.
                </p>
                <button
                    className={`btn ${isAntigravity ? 'btn-active' : ''}`}
                    onClick={onToggle}
                >
                    <div className="btn-content">
                        <span className="icon">{isAntigravity ? '🚀' : '⬇️'}</span>
                        <span>{isAntigravity ? 'Disable Antigravity' : 'Enable Antigravity'}</span>
                    </div>
                </button>
            </div>
        </div>
    );
};
