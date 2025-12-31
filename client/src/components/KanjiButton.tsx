import { motion } from "framer-motion";

interface KanjiButtonProps {
  kanji: string;
  onClick: () => void;
  disabled?: boolean;
  state?: "idle" | "correct" | "incorrect";
}

export function KanjiButton({ kanji, onClick, disabled, state = "idle" }: KanjiButtonProps) {
  const variants = {
    idle: { scale: 1, y: 0, backgroundColor: "rgb(255, 255, 255)" },
    hover: { scale: 1.05, y: -5, backgroundColor: "rgb(250, 250, 255)" },
    tap: { scale: 0.95, y: 0 },
    correct: { 
      scale: [1, 1.1, 1], 
      backgroundColor: "rgb(220, 252, 231)", 
      borderColor: "rgb(34, 197, 94)",
      color: "rgb(21, 128, 61)"
    },
    incorrect: { 
      x: [0, -10, 10, -10, 10, 0], 
      backgroundColor: "rgb(254, 226, 226)", 
      borderColor: "rgb(239, 68, 68)",
      color: "rgb(185, 28, 28)"
    }
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      variants={variants}
      initial="idle"
      animate={state}
      whileHover={state === "idle" && !disabled ? "hover" : undefined}
      whileTap={state === "idle" && !disabled ? "tap" : undefined}
      className={`
        w-28 h-28 md:w-36 md:h-36 rounded-3xl border-4 
        shadow-[0_8px_0_0_rgba(0,0,0,0.1)]
        active:shadow-none
        flex items-center justify-center
        text-6xl md:text-7xl font-japanese font-bold
        transition-colors duration-200
        ${state === "idle" ? "border-slate-200 text-slate-700" : ""}
        ${disabled ? "cursor-default opacity-80" : "cursor-pointer"}
      `}
    >
      {kanji}
    </motion.button>
  );
}
