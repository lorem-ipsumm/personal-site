"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

const BallPit = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const ballsRef = useRef<Matter.Body[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !sceneRef.current) return;

    // Create engine
    const engine = Matter.Engine.create();
    engine.world.gravity.y = 0.8;
    engineRef.current = engine;

    // Create renderer
    const render = Matter.Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: sceneRef.current.clientWidth,
        height: 400,
        wireframes: false,
        background: "transparent",
      },
    });
    renderRef.current = render;

    // Create walls
    const walls = [
      // Bottom
      Matter.Bodies.rectangle(
        render.options.width! / 2,
        render.options.height! - 10,
        render.options.width!,
        20,
        { isStatic: true, render: { fillStyle: "hsl(var(--border))" } },
      ),
      // Left
      Matter.Bodies.rectangle(
        10,
        render.options.height! / 2,
        20,
        render.options.height!,
        { isStatic: true, render: { fillStyle: "hsl(var(--border))" } },
      ),
      // Right
      Matter.Bodies.rectangle(
        render.options.width! - 10,
        render.options.height! / 2,
        20,
        render.options.height!,
        { isStatic: true, render: { fillStyle: "hsl(var(--border))" } },
      ),
    ];

    // Add walls to world
    Matter.World.add(engine.world, walls);

    // Create initial balls
    const colors = [
      "hsl(var(--primary))",
      "hsl(var(--accent))",
      "hsl(var(--muted))",
      "hsl(var(--secondary))",
      "hsl(var(--chart-1))",
      "hsl(var(--chart-2))",
      "hsl(var(--chart-3))",
    ];

    const createBall = (x: number, y: number) => {
      const radius = Math.random() * 15 + 10; // Random size between 10-25
      const colorIndex = Math.floor(Math.random() * colors.length);

      return Matter.Bodies.circle(x, y, radius, {
        restitution: 0.8,
        friction: 0.1,
        frictionAir: 0.01,
        render: {
          fillStyle: colors[colorIndex],
        },
      });
    };

    // Add initial balls
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * (render.options.width! - 100) + 50;
      const y = Math.random() * 200 + 50;
      const ball = createBall(x, y);
      ballsRef.current.push(ball);
      Matter.World.add(engine.world, ball);
    }

    // Mouse interaction
    const mouse = Matter.Mouse.create(render.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
    });
    Matter.World.add(engine.world, mouseConstraint);

    // Click to add new balls
    const handleClick = (event: MouseEvent) => {
      const rect = render.canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      if (ballsRef.current.length < 50) {
        // Limit number of balls
        const ball = createBall(x, y);
        ballsRef.current.push(ball);
        Matter.World.add(engine.world, ball);
      }
    };

    render.canvas.addEventListener("click", handleClick);

    // Run the engine and renderer
    Matter.Render.run(render);
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    // Handle resize
    const handleResize = () => {
      if (sceneRef.current && render.canvas) {
        const width = sceneRef.current.clientWidth;
        render.canvas.width = width;
        render.options.width = width;
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      render.canvas.removeEventListener("click", handleClick);
      Matter.Render.stop(render);
      Matter.World.clear(engine.world, false);
      Matter.Engine.clear(engine);
      ballsRef.current = [];
    };
  }, [isClient]);

  if (!isClient) {
    return (
      <section className="border-border/40 bg-muted/20 border-t py-12">
        <div className="mx-auto max-w-4xl px-6">
          <div className="bg-muted/50 h-96 w-full animate-pulse rounded-lg" />
        </div>
      </section>
    );
  }

  return (
    <section className="border-border/40 bg-muted/20 border-t py-12">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-6">
          <h3 className="mb-2 text-lg font-semibold tracking-tight">
            INTERACTIVE PHYSICS
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Click anywhere to add balls and watch them interact with physics.
            Drag them around to play!
          </p>
        </div>

        <div
          ref={sceneRef}
          className="border-border/40 bg-background/50 w-full overflow-hidden rounded-lg border"
          style={{ height: "400px" }}
        />

        <div className="mt-4 text-center">
          <p className="text-muted-foreground text-xs">
            Powered by Matter.js • Click to add balls • Drag to interact
          </p>
        </div>
      </div>
    </section>
  );
};

export default BallPit;
