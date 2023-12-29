"use client";
import { Engine, Render, World, Bodies, Vector, Body } from "matter-js";
import { Fragment, useEffect, useRef } from "react";
import { RefreshCcw } from "react-feather";

const FunBox = () => {
  const scene = useRef(null);
  const engine = useRef(Engine.create());
  const bodies = useRef<Body[]>([]);

  // low vertical gravity
  engine.current.world.gravity.y = 0.0;

  useEffect(() => {
    if (!scene.current) return;

    // get the canvas
    const canvas = scene.current as HTMLDivElement;
    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;

    const render = Render.create({
      element: scene.current,
      engine: engine.current,
      options: {
        width: cw,
        height: ch,
        wireframes: false,
        background: "transparent",
      },
    });

    // add mouse control
    // World.add(engine.current.world, mouseConstraint);

    // boundaries
    World.add(engine.current.world, [
      Bodies.rectangle(cw / 2, -10, cw, 20, { isStatic: true }),
      Bodies.rectangle(-10, ch / 2, 20, ch, { isStatic: true }),
      Bodies.rectangle(cw / 2, ch + 10, cw, 20, { isStatic: true }),
      Bodies.rectangle(cw + 10, ch / 2, 20, ch, { isStatic: true }),
    ]);

    // run the engine
    Engine.run(engine.current);
    Render.run(render);

    addInitialBodies(10);
    applyForce(
      {
        // apply force at random x value between 0 and 100
        x: Math.random() * 5,
        y: 0,
      },
      // apply a random force value between 0.1 and 0.5
      0.1 + Math.random() * 0.4,
    );

    // unmount
    return () => {
      // destroy Matter
      Render.stop(render);
      // World.remove(engine.current.world)
      // World.remove(engine.current.world, mouseConstraint);
      Engine.clear(engine.current);
      render.canvas.remove();
      // render.canvas = null
      // render.context = null
      render.textures = {};
    };
  }, []);

  const addInitialBodies = (count: number) => {
    for (let i = 0; i < count; i++) {
      // generate a random color
      const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
      const params = {
        x: 9,
        y: 1,
        radius: 10 + Math.random() * 20,
        options: {
          mass: 10,
          // restitution is the "bounciness" of the object
          restitution: 0.9,
          // friction is the "roughness" of the object
          friction: 0.0,
          render: {
            fillStyle: color,
          },
        },
      };
      if (Math.random() > 0.5) {
        addCircle(params);
      } else {
        addRectangle(params);
      }
    }
  };

  // remove all of the bodies from the world
  const clearBodies = () => {
    bodies.current.forEach((body) => {
      World.remove(engine.current.world, body);
    });
    bodies.current = [];

    addInitialBodies(10);
    applyForce(
      {
        // apply force at random x value between 0 and 100
        x: Math.random() * 5,
        y: 0,
      },
      // apply a random force value between 0.1 and 0.5
      0.3 + Math.random() * 0.5,
    );
  };

  const addCircle = (params: any) => {
    const body = Bodies.circle(
      params.x,
      params.y,
      params.radius,
      params.options,
    );
    World.add(engine.current.world, [body]);
    bodies.current.push(body);
  };

  const addRectangle = (params: any) => {
    const body = Bodies.rectangle(
      params.x,
      params.y,
      params.radius,
      params.radius,
      params.options,
    );
    World.add(engine.current.world, [body]);
    bodies.current.push(body);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // get the x and y coordinates of the click event relative to the element
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    // generate a random color
    const color = "#" + Math.floor(Math.random() * 16777215).toString(16);

    // create a body with random size and add it to the world
    const params = {
      x,
      y,
      radius: 10 + Math.random() * 20,
      options: {
        mass: 10,
        // restitution is the "bounciness" of the object
        restitution: 0.9,
        // friction is the "roughness" of the object
        friction: 0.0,
        render: {
          fillStyle: `${color}`,
        },
      },
    };

    // 50% chance of adding a circle or a rectangle
    if (Math.random() > 0.5) {
      addCircle(params);
    } else {
      addRectangle(params);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const mousePosition = {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };
    applyForce(mousePosition, 0.05);
  };

  const applyForce = (
    position: { x: number; y: number },
    forceValue: number = 0.1,
  ) => {
    bodies.current.forEach((body) => {
      const distance = Vector.magnitude(Vector.sub(position, body.position));

      if (distance < 50) {
        // adjust this value to control the "sensitivity" of the balls
        const force = Vector.mult(
          Vector.normalise(Vector.sub(body.position, position)),
          forceValue,
        ); // adjust the multiplier to control the "strength" of the force
        Body.applyForce(body, body.position, force);
      }
    });
  };

  return (
    <Fragment>
      <div
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        className="h-60 w-full"
        ref={scene}
      />
      <RefreshCcw
        onClick={clearBodies}
        className="ease absolute right-5 top-[18px] cursor-pointer text-white transition-all duration-500 hover:text-blue-500 hover:rotate-180"
        size={20}
      />
    </Fragment>
  );
};

export default FunBox;
