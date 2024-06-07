"use client";
import { useAtom } from "jotai";
import { Engine, Render, World, Bodies, Vector, Body } from "matter-js";
import { Fragment, useEffect, useRef } from "react";
import { RefreshCcw } from "react-feather";
import { currentArticleAtom } from "~/app/utils/atoms";

const BallPit = () => {
  const scene = useRef(null);
  const engine = useRef(Engine.create());
  const bodies = useRef<Body[]>([]);

  // low vertical gravity
  engine.current.world.gravity.y = 0.0;

  // import atom
  const [currentArticle] = useAtom(currentArticleAtom);

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

  useEffect(() => {
    if (!currentArticle || !scene.current) return;
    // apply a force to a random point on the canvas
    const canvas = scene.current as HTMLDivElement;
    const cw = canvas.clientWidth as number;
    const ch = canvas.clientHeight as number;
    applyForce(
      {
        x: Math.random() * cw,
        y: Math.random() * ch,
      },
      0.1,
      200,
    );
  }, [currentArticle]);

  const addInitialBodies = (count: number) => {
    // get the canvas
    let x = 9;
    let y = 1;
    if (scene.current) {
      const canvas = scene.current as HTMLDivElement;
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      // set the x and y values to be random points on the canvas
      x = Math.random() * cw;
      y = Math.random() * ch;
    }
    for (let i = 0; i < count; i++) {
      // generate a random color
      const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
      const params = {
        x: x,
        y: y,
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
  const resetBodies = () => {
    bodies.current.forEach((body, index) => {
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
      100,
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
    minDistance: number = 50,
  ) => {
    bodies.current.forEach((body) => {
      const distance = Vector.magnitude(Vector.sub(position, body.position));
      if (distance < minDistance) {
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
        className="h-full w-full"
        ref={scene}
      />
      {/* <RefreshCcw
        onClick={resetBodies}
        className="ease absolute right-5 top-[18px] cursor-pointer text-white transition-all duration-500 hover:rotate-180 hover:text-blue-500"
        size={20}
      /> */}
    </Fragment>
  );
};

export default BallPit;
