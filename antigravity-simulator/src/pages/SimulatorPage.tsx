import React from 'react';
import { usePhysicsEngine } from '../hooks/usePhysicsEngine';
import { PhysicsCanvas } from '../components/PhysicsCanvas';
import { Controls } from '../components/Controls';
import { ErrorBoundary } from '../components/ErrorBoundary';

export const SimulatorPage: React.FC = () => {
    // Logic and side effects are encapsulated within the custom hook.
    // There is NO useEffect directly inside this page component.
    const { containerRef, canvasRef, isAntigravity, toggleGravity, hasError } = usePhysicsEngine();

    // If the hook reports a critical initialization error, we could throw to let the boundary catch it
    // or handle it nicely in the UI. We'll throw so the ErrorBoundary above catches it, 
    // or we render an error state directly. The hook returns `hasError`.
    if (hasError) {
        throw new Error('Physics constraints out of bounds. Engine failed to start.');
    }

    return (
        <ErrorBoundary>
            <main className="simulator-page">
                <PhysicsCanvas
                    containerRef={containerRef}
                    canvasRef={canvasRef}
                />
                <Controls
                    isAntigravity={isAntigravity}
                    onToggle={toggleGravity}
                    hasError={hasError}
                />
            </main>
        </ErrorBoundary>
    );
};
