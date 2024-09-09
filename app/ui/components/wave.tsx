import { motion } from 'framer-motion';

const Wave = () => {
  const waveVariants = {
    animate: {
      d: [
        "M0,160 L48,181.3 C96,203,192,245,288,240 C384,235,480,181,576,181.3 C672,181,768,235,864,245.3 C960,256,1056,224,1152,213.3 C1248,203,1344,213,1392,218.7 L1440,224 L1440,320 L1392,320 C1344,320,1248,320,1152,320 C1056,320,960,320,864,320 C768,320,672,320,576,320 C480,320,384,320,288,320 C192,320,96,320,48,320 L0,320 Z",
        "M0,128 L48,149.3 C96,171,192,213,288,213.3 C384,213,480,171,576,165.3 C672,160,768,192,864,213.3 C960,235,1056,245,1152,234.7 C1248,224,1344,192,1392,176 L1440,160 L1440,320 L1392,320 C1344,320,1248,320,1152,320 C1056,320,960,320,864,320 C768,320,672,320,576,320 C480,320,384,320,288,320 C192,320,96,320,48,320 L0,320 Z",
        "M0,192 L48,176 C96,160,192,128,288,138.7 C384,149,480,203,576,224 C672,245,768,235,864,213.3 C960,192,1056,160,1152,149.3 C1248,139,1344,149,1392,154.7 L1440,160 L1440,320 L1392,320 C1344,320,1248,320,1152,320 C1056,320,960,320,864,320 C768,320,672,320,576,320 C480,320,384,320,288,320 C192,320,96,320,48,320 L0,320 Z",
        "M0,160 L48,181.3 C96,203,192,245,288,240 C384,235,480,181,576,181.3 C672,181,768,235,864,245.3 C960,256,1056,224,1152,213.3 C1248,203,1344,213,1392,218.7 L1440,224 L1440,320 L1392,320 C1344,320,1248,320,1152,320 C1056,320,960,320,864,320 C768,320,672,320,576,320 C480,320,384,320,288,320 C192,320,96,320,48,320 L0,320 Z",
      ],
    },
  };

  const waveTransition = {
    repeat: Infinity,
    ease: "easeInOut",
    yoyo: true,
  };

  const waves = [
    { color: "text-purple-400 dark:text-indigo-300", duration: 12, opacity: 0.7 },
    { color: "text-pink-300 dark:text-violet-500", duration: 10, opacity: 0.5 },
    { color: "text-teal-300 dark:text-cyan-400", duration: 8, opacity: 0.3 },
  ];

  return (
    <div className="absolute bottom-0 left-0 w-full -z-1 h-48 overflow-hidden">
      {waves.map((wave, index) => (
        <motion.svg
          key={index}
          className="absolute top-0 left-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <motion.path
            fill="currentColor"
            className={wave.color}
            variants={waveVariants}
            animate="animate"
            transition={{ ...waveTransition, duration: wave.duration }}
            style={{ opacity: wave.opacity }}
          />
        </motion.svg>
      ))}
    </div>
  );
};

export default Wave;
