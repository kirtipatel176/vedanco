import React, { RefObject } from 'react';

interface PhysicsCanvasProps {
    containerRef: RefObject<HTMLDivElement>;
    canvasRef: RefObject<HTMLCanvasElement>;
}

export const PhysicsCanvas: React.FC<PhysicsCanvasProps> = ({ containerRef, canvasRef }) => {
    return (
        <div ref={containerRef} className="physics-container">
            <canvas ref={canvasRef} className="physics-canvas" />
        </div>
    );
};
