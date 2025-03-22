import React from "react";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const ParticleBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: {
            value: "#000000",
          },
        },
        particles: {
          number: {
            value: 100,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: "#ffffff",
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.5,
            random: true,
          },
          size: {
            value: 2,
            random: true,
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            outModes: {
              default: "out",
            },
            straight: false,
          },
          links: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1,
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab", // Form lines with mouse on hover
            },
            onClick: {
              enable: true,
              mode: "repulse", // Push particles away on click
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 150,
              line_linked: {
                opacity: 0.8,
              },
            },
            repulse: {
              distance: 300,  // Dramatic effect! Push particles farther
              duration: 0.8,  // Slower push for a more cinematic feel
              speed: 1,        // Speed of repulsion
            },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticleBackground;
