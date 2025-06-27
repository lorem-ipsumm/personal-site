"use client";

import { useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import Matter from "matter-js";
import { useThemeStore } from "~/hooks/state/useThemeStore";

interface PhysicsBackgroundProps {
  ballCount?: number;
  boxCount?: number;
}

const PhysicsBackground = ({
  ballCount = 8,
  boxCount = 6,
}: PhysicsBackgroundProps) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const mouseConstraintRef = useRef<Matter.MouseConstraint | null>(null);
  const bodiesRef = useRef<Matter.Body[]>([]);
  const boxesRef = useRef<Matter.Body[]>([]);
  const pathname = usePathname();
  const { theme } = useThemeStore();

  const initPhysics = useCallback(() => {
    if (!sceneRef.current) return;

    const { Engine, Render, World, Bodies, Mouse, MouseConstraint, Runner } =
      Matter;

    // Create engine
    const engine = Engine.create();
    engine.world.gravity.y = 0.0;
    engineRef.current = engine;

    // Create renderer
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: "transparent",
        showVelocity: false,
        showAngleIndicator: false,
        showDebug: false,
        pixelRatio: window.devicePixelRatio || 1,
      },
    });
    renderRef.current = render;

    // Create boundaries (invisible walls)
    const boundaries = [
      Bodies.rectangle(window.innerWidth / 2, -10, window.innerWidth, 20, {
        isStatic: true,
        render: { visible: false },
      }),
      Bodies.rectangle(
        window.innerWidth / 2,
        window.innerHeight + 10,
        window.innerWidth,
        20,
        { isStatic: true, render: { visible: false } },
      ),
      Bodies.rectangle(-10, window.innerHeight / 2, 20, window.innerHeight, {
        isStatic: true,
        render: { visible: false },
      }),
      Bodies.rectangle(
        window.innerWidth + 10,
        window.innerHeight / 2,
        20,
        window.innerHeight,
        { isStatic: true, render: { visible: false } },
      ),
    ];

    // Create balls
    const balls: Matter.Body[] = [];
    for (let i = 0; i < ballCount; i++) {
      const ball = Bodies.circle(
        Math.random() * (window.innerWidth - 100) + 50,
        Math.random() * (window.innerHeight - 100) + 50,
        Math.random() * 20 + 15,
        {
          restitution: 0.6,
          friction: 0.1,
          frictionAir: 0.01,
          render: {
            fillStyle: `hsl(${Math.random() * 360}, 50%, 70%)`,
            strokeStyle: "rgba(100, 100, 100, 0.5)",
            lineWidth: 1,
          },
        },
      );
      balls.push(ball);
    }

    // Create boxes
    const boxes: Matter.Body[] = [];
    for (let i = 0; i < boxCount; i++) {
      const size = Math.random() * 30 + 20;
      const box = Bodies.rectangle(
        Math.random() * (window.innerWidth - 100) + 50,
        Math.random() * (window.innerHeight - 100) + 50,
        size,
        size,
        {
          restitution: 0.4,
          friction: 0.2,
          frictionAir: 0.01,
          render: {
            fillStyle: `hsl(${Math.random() * 360}, 40%, 60%)`,
            strokeStyle: "rgba(100, 100, 100, 0.5)",
            lineWidth: 1,
          },
        },
      );
      boxes.push(box);
    }

    // Store boxes separately for scroll interactions
    boxesRef.current = boxes;

    // Store all bodies for cleanup
    bodiesRef.current = [...balls, ...boxes, ...boundaries];

    // Add all bodies to world
    World.add(engine.world, bodiesRef.current);

    // Create mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

    mouseConstraintRef.current = mouseConstraint;
    World.add(engine.world, mouseConstraint);

    // Setup canvas to allow interaction with physics but let clicks pass through
    render.canvas.style.pointerEvents = "auto";
    render.canvas.style.position = "absolute";
    render.canvas.style.top = "0";
    render.canvas.style.left = "0";

    // Keep the mouse in sync with rendering
    render.mouse = mouse;

    // Start renderer
    Render.run(render);

    // Create runner
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Add some random forces periodically
    const forceInterval = setInterval(() => {
      balls.forEach((ball) => {
        if (Math.random() < 0.1) {
          Matter.Body.applyForce(ball, ball.position, {
            x: (Math.random() - 0.5) * 0.001,
            y: (Math.random() - 0.5) * 0.001,
          });
        }
      });
    }, 2000);

    return () => {
      clearInterval(forceInterval);
    };
  }, [ballCount, boxCount]);

  const handleScroll = useCallback(() => {
    if (!bodiesRef.current.length) return;

    bodiesRef.current.forEach((body) => {
      // Apply random force to each body
      Matter.Body.applyForce(body, body.position, {
        x: (Math.random() - 0.5) * 0.005,
        y: (Math.random() - 0.5) * 0.005,
      });
    });
  }, []);

  const applyPageChangeForce = useCallback(() => {
    if (!bodiesRef.current.length) return;

    bodiesRef.current.forEach((body) => {
      // Apply stronger random force for page changes
      Matter.Body.applyForce(body, body.position, {
        x: (Math.random() - 0.5) * 0.04,
        y: (Math.random() - 0.5) * 0.04,
      });
    });
  }, []);

  const handleResize = useCallback(() => {
    if (!renderRef.current || !engineRef.current) return;

    const render = renderRef.current;
    const engine = engineRef.current;

    // Update canvas size
    render.bounds.max.x = window.innerWidth;
    render.bounds.max.y = window.innerHeight;
    render.options.width = window.innerWidth;
    render.options.height = window.innerHeight;
    render.canvas.width = window.innerWidth;
    render.canvas.height = window.innerHeight;

    // Update boundaries
    const boundaries = engine.world.bodies.filter(
      (body) => !body.render.visible,
    );
    if (boundaries.length >= 4) {
      if (boundaries[0]) {
        Matter.Body.setPosition(boundaries[0], {
          x: window.innerWidth / 2,
          y: -10,
        });
      }
      if (boundaries[1]) {
        Matter.Body.setPosition(boundaries[1], {
          x: window.innerWidth / 2,
          y: window.innerHeight + 10,
        });
      }
      if (boundaries[2]) {
        Matter.Body.setPosition(boundaries[2], {
          x: -10,
          y: window.innerHeight / 2,
        });
      }
      if (boundaries[3]) {
        Matter.Body.setPosition(boundaries[3], {
          x: window.innerWidth + 10,
          y: window.innerHeight / 2,
        });
      }
    }
  }, []);

  useEffect(() => {
    const cleanup = initPhysics();

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      cleanup?.();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);

      if (renderRef.current) {
        Matter.Render.stop(renderRef.current);
        renderRef.current.canvas.remove();
        renderRef.current = null;
      }

      if (engineRef.current) {
        Matter.Engine.clear(engineRef.current);
        engineRef.current = null;
      }

      if (mouseConstraintRef.current) {
        mouseConstraintRef.current = null;
      }

      bodiesRef.current = [];
      boxesRef.current = [];
    };
  }, [initPhysics, handleResize, handleScroll]);

  // Apply page change force when pathname changes
  useEffect(() => {
    applyPageChangeForce();
  }, [pathname, applyPageChangeForce]);

  return (
    <div
      ref={sceneRef}
      className={`max-md:blur-4xl fixed inset-0 ${
        theme === "dark" ? "blur-2xl" : "blur-[30px]"
      }`}
      style={{
        zIndex: 1,
        opacity: 0.7,
        pointerEvents: "none",
      }}
    />
  );
};

export default PhysicsBackground;
