import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

export const usePhysicsEngine = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const engineRef = useRef<Matter.Engine | null>(null);
    const renderRef = useRef<Matter.Render | null>(null);
    const runnerRef = useRef<Matter.Runner | null>(null);

    const [isAntigravity, setIsAntigravity] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (!containerRef.current || !canvasRef.current) return;

        try {
            const { Engine, Render, Runner, Bodies, Mouse, MouseConstraint, Composite } = Matter;

            // Create engine
            const engine = Engine.create();
            engineRef.current = engine;

            // Create renderer
            const render = Render.create({
                element: containerRef.current,
                canvas: canvasRef.current,
                engine: engine,
                options: {
                    width: window.innerWidth,
                    height: window.innerHeight,
                    wireframes: false,
                    background: 'transparent',
                    pixelRatio: window.devicePixelRatio,
                }
            });
            renderRef.current = render;

            // Create static walls
            const wallOptions = { isStatic: true, render: { fillStyle: '#ffffff22' } };
            const walls = [
                Bodies.rectangle(window.innerWidth / 2, -50, window.innerWidth, 100, wallOptions), // Top
                Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 50, window.innerWidth, 100, wallOptions), // Bottom
                Bodies.rectangle(-50, window.innerHeight / 2, 100, window.innerHeight, wallOptions), // Left
                Bodies.rectangle(window.innerWidth + 50, window.innerHeight / 2, 100, window.innerHeight, wallOptions) // Right
            ];

            // Add falling / floating objects
            const objects = [];
            const colors = ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

            for (let i = 0; i < 40; i++) {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                const radius = 20 + Math.random() * 30;
                const isCircle = Math.random() > 0.5;

                const renderOptions = {
                    fillStyle: colors[Math.floor(Math.random() * colors.length)],
                    strokeStyle: '#ffffff55',
                    lineWidth: 2
                };

                if (isCircle) {
                    objects.push(Bodies.circle(x, y, radius, { render: renderOptions }));
                } else {
                    objects.push(Bodies.rectangle(x, y, radius * 1.5, radius * 1.5, { render: renderOptions }));
                }
            }

            Composite.add(engine.world, [...walls, ...objects]);

            // Add mouse interaction
            const mouse = Mouse.create(render.canvas);
            const mouseConstraint = MouseConstraint.create(engine, {
                mouse: mouse,
                constraint: {
                    stiffness: 0.2,
                    render: {
                        visible: false
                    }
                }
            });
            Composite.add(engine.world, mouseConstraint);
            // keep the mouse in sync with rendering
            render.mouse = mouse;

            // Run the engine and renderer
            Render.run(render);
            const runner = Runner.create();
            runnerRef.current = runner;
            Runner.run(runner, engine);

            // Handle window resize
            const handleResize = () => {
                render.canvas.width = window.innerWidth;
                render.canvas.height = window.innerHeight;
                render.options.width = window.innerWidth;
                render.options.height = window.innerHeight;

                // Reposition walls
                Matter.Body.setPosition(walls[0], { x: window.innerWidth / 2, y: -50 });
                Matter.Body.setPosition(walls[1], { x: window.innerWidth / 2, y: window.innerHeight + 50 });
                Matter.Body.setPosition(walls[2], { x: -50, y: window.innerHeight / 2 });
                Matter.Body.setPosition(walls[3], { x: window.innerWidth + 50, y: window.innerHeight / 2 });
            };

            window.addEventListener('resize', handleResize);

            // Cleanup on unmount
            return () => {
                window.removeEventListener('resize', handleResize);
                Render.stop(render);
                Runner.stop(runner);
                Composite.clear(engine.world, false);
                Engine.clear(engine);
            };
        } catch (err) {
            console.error('Physics engine initialization failed:', err);
            // Setting state directly isn't advised if the component hasn't safely mounted, but we can queue it instead
            setTimeout(() => setHasError(true), 0);
        }
    }, []);

    // Effect to toggle gravity
    useEffect(() => {
        if (engineRef.current) {
            // Normal gravity is positive (falling down), antigravity is negative (floating up)
            engineRef.current.gravity.y = isAntigravity ? -1 : 1;
        }
    }, [isAntigravity]);

    const toggleGravity = () => {
        setIsAntigravity(prev => !prev);
    };

    return {
        containerRef,
        canvasRef,
        isAntigravity,
        toggleGravity,
        hasError,
    };
};
