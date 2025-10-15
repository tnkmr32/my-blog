'use client';

import {AnimatePresence, motion} from 'motion/react';

const variants = {
  hidden: {opacity: 0},
  enter: {opacity: 1},
};

export default function FadeTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="site-wrapper"
        variants={variants}
        initial="hidden"
        animate="enter"
        transition={{
          type: 'tween',
          ease: 'easeInOut',
          duration: 1,
          delay: 0.1,
        }}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
