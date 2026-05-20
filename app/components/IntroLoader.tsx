"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Logo from "./Logo";

export default function IntroLoader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 1700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-[#f5f6f7]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7 } }}
        >
          <motion.div
            initial={{ scale: 0.75, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 1.15, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex h-28 w-28 items-center justify-center rounded-[32px] bg-white shadow-2xl"
          >
            <Logo className="h-16 w-16 text-[#1f2428]" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}