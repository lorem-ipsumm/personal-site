"use client";

import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorLagRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mousePosition = useRef({ x: 0, y: 0 });
  const lagPosition = useRef({ x: 0, y: 0 });
  const trailPositions = useRef<{ x: number; y: number }[]>([]);
  const animationRef = useRef<number>();
  const isClicking = useRef(false);

  const TRAIL_LENGTH = 8;

  useEffect(() => {
    // Initialize trail positions
    for (let i = 0; i < TRAIL_LENGTH; i++) {
      trailPositions.current.push({ x: 0, y: 0 });
    }

    // Hide default cursor
    // document.body.style.cursor = "none";

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };

      // Update immediate cursor position
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    const animateCursors = () => {
      // Smooth animation for lagging cursor using easing
      const ease = 0.08;

      lagPosition.current.x +=
        (mousePosition.current.x - lagPosition.current.x) * ease;
      lagPosition.current.y +=
        (mousePosition.current.y - lagPosition.current.y) * ease;

      if (cursorLagRef.current) {
        cursorLagRef.current.style.left = `${lagPosition.current.x}px`;
        cursorLagRef.current.style.top = `${lagPosition.current.y}px`;
      }

      // Update trail positions with cascading easing
      for (let i = 0; i < TRAIL_LENGTH; i++) {
        const targetX =
          i === 0
            ? lagPosition.current.x
            : trailPositions.current[i - 1]?.x ?? 0;
        const targetY =
          i === 0
            ? lagPosition.current.y
            : trailPositions.current[i - 1]?.y ?? 0;

        const trailEase = 0.15 - i * 0.015; // Decreasing ease for more lag

        if (trailPositions.current[i]) {
          trailPositions.current[i]!.x +=
            (targetX - trailPositions.current[i]!.x) * trailEase;
          trailPositions.current[i]!.y +=
            (targetY - trailPositions.current[i]!.y) * trailEase;

          if (trailRefs.current[i]) {
            trailRefs.current[i]!.style.left = `${
              trailPositions.current[i]!.x
            }px`;
            trailRefs.current[i]!.style.top = `${
              trailPositions.current[i]!.y
            }px`;
          }
        }
      }

      animationRef.current = requestAnimationFrame(animateCursors);
    };

    const handleMouseEnter = () => {
      if (cursorRef.current && cursorLagRef.current) {
        cursorRef.current.style.opacity = "1";
        cursorLagRef.current.style.opacity = "1";
      }
      trailRefs.current.forEach((trail) => {
        if (trail) {
          trail.style.opacity = "1";
        }
      });
    };

    const handleMouseLeave = () => {
      if (cursorRef.current && cursorLagRef.current) {
        cursorRef.current.style.opacity = "0";
        cursorLagRef.current.style.opacity = "0";
      }
      trailRefs.current.forEach((trail) => {
        if (trail) {
          trail.style.opacity = "0";
        }
      });
    };

    const handleMouseDown = () => {
      isClicking.current = true;
      if (cursorRef.current) {
        cursorRef.current.style.transform = "translate(-50%, -50%) scale(1.8)";
        cursorRef.current.style.transition = "transform 0.1s ease-out";
      }
      if (cursorLagRef.current) {
        cursorLagRef.current.style.transform =
          "translate(-50%, -50%) scale(1.5)";
        cursorLagRef.current.style.transition = "transform 0.15s ease-out";
      }
      trailRefs.current.forEach((trail, index) => {
        if (trail) {
          const scale = 1.2 - index * 0.05;
          trail.style.transform = `translate(-50%, -50%) scale(${scale})`;
          trail.style.transition = `transform ${0.2 + index * 0.05}s ease-out`;
        }
      });
    };

    const handleMouseUp = () => {
      isClicking.current = false;
      if (cursorRef.current) {
        cursorRef.current.style.transform = "translate(-50%, -50%) scale(1)";
        cursorRef.current.style.transition = "transform 0.25s ease-out";
      }
      if (cursorLagRef.current) {
        cursorLagRef.current.style.transform = "translate(-50%, -50%) scale(1)";
        cursorLagRef.current.style.transition = "transform 0.3s ease-out";
      }
      trailRefs.current.forEach((trail, index) => {
        if (trail) {
          trail.style.transform = "translate(-50%, -50%) scale(1)";
          trail.style.transition = `transform ${0.3 + index * 0.05}s ease-out`;
        }
      });
    };

    // Add event listeners
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    // Start animation loop
    animationRef.current = requestAnimationFrame(animateCursors);

    // Cleanup
    return () => {
      document.body.style.cursor = "auto";
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Immediate cursor dot */}
      {/* <div
        ref={cursorRef}
        className="pointer-events-none fixed z-[9999] opacity-0 transition-opacity duration-300"
        style={{
          width: "5px",
          height: "5px",
          backgroundColor: "var(--color-accent)",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
        }}
      /> */}

      {/* Lagging cursor dot */}
      <div
        ref={cursorLagRef}
        className="pointer-events-none fixed z-[9998] opacity-0 transition-opacity duration-300"
        style={{
          width: "10px",
          height: "10px",
          border: "1px solid var(--color-accent)",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Trail circles */}
      {Array.from({ length: TRAIL_LENGTH }, (_, index) => (
        <div
          key={index}
          ref={(el) => (trailRefs.current[index] = el)}
          className="pointer-events-none fixed opacity-0 transition-opacity duration-300"
          style={{
            width: `${8 - index * 0.5}px`,
            height: `${8 - index * 0.5}px`,
            backgroundColor: "var(--color-accent)",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9997 - index,
            opacity: `${0.8 - index * 0.1}`,
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;
