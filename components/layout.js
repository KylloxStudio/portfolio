const { motion } = require("framer-motion");
import Navigation from "./navigation";

export default function Layout({ children }) {
  return (
    <>
      <Navigation />
      <motion.main initial="init" animate="enter" exit="exit" variants={variants}>
        {children}
      </motion.main>
    </>
  );
}

const variants = {
  init: { opacity: 0, x: 0, y: -200 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 500, transition: { type: "tween", delay: 0.1, duration: 0.3 } },
}
