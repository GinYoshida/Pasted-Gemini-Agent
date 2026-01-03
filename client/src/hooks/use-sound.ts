import { useCallback, useRef } from "react";

const SOUNDS = {
  correct: {
    frequency: 880,
    duration: 0.15,
    type: "sine" as OscillatorType,
    pattern: [
      { freq: 523.25, duration: 0.1 },
      { freq: 659.25, duration: 0.1 },
      { freq: 783.99, duration: 0.15 },
    ],
  },
  incorrect: {
    frequency: 200,
    duration: 0.3,
    type: "sawtooth" as OscillatorType,
    pattern: [
      { freq: 300, duration: 0.15 },
      { freq: 200, duration: 0.2 },
    ],
  },
};

export function useSound() {
  const audioContextRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playTone = useCallback(
    (frequency: number, duration: number, type: OscillatorType = "sine", startTime: number = 0) => {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, ctx.currentTime + startTime);

      gainNode.gain.setValueAtTime(0.3, ctx.currentTime + startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + startTime + duration);

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.start(ctx.currentTime + startTime);
      oscillator.stop(ctx.currentTime + startTime + duration);
    },
    [getAudioContext]
  );

  const playCorrect = useCallback(() => {
    let time = 0;
    for (const note of SOUNDS.correct.pattern) {
      playTone(note.freq, note.duration, "sine", time);
      time += note.duration * 0.8;
    }
  }, [playTone]);

  const playIncorrect = useCallback(() => {
    let time = 0;
    for (const note of SOUNDS.incorrect.pattern) {
      playTone(note.freq, note.duration, "triangle", time);
      time += note.duration * 0.7;
    }
  }, [playTone]);

  return {
    playCorrect,
    playIncorrect,
  };
}
