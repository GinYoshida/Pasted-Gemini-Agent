import { useState, useEffect, useCallback, useRef } from "react";

interface UseTextToSpeechOptions {
  language: "ja" | "en";
  rate?: number;
  pitch?: number;
}

interface UseTextToSpeechReturn {
  speak: (text: string) => void;
  cancel: () => void;
  isSpeaking: boolean;
  isSupported: boolean;
  voiceReady: boolean;
}

export function useTextToSpeech({
  language,
  rate = 0.9,
  pitch = 1.0,
}: UseTextToSpeechOptions): UseTextToSpeechReturn {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceReady, setVoiceReady] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const isSupported = typeof window !== "undefined" && "speechSynthesis" in window;

  useEffect(() => {
    if (!isSupported) return;

    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0) {
        setVoiceReady(true);
      }
    };

    loadVoices();

    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, [isSupported]);

  const getVoiceForLanguage = useCallback((): SpeechSynthesisVoice | null => {
    if (voices.length === 0) return null;

    const langCode = language === "ja" ? "ja" : "en";
    const preferredLocales = language === "ja" 
      ? ["ja-JP", "ja"] 
      : ["en-US", "en-GB", "en"];

    for (const locale of preferredLocales) {
      const voice = voices.find(
        (v) => v.lang.startsWith(locale) || v.lang === locale
      );
      if (voice) return voice;
    }

    const fallback = voices.find((v) => v.lang.startsWith(langCode));
    return fallback || voices[0] || null;
  }, [voices, language]);

  const speak = useCallback(
    (text: string) => {
      if (!isSupported || !text) return;

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utteranceRef.current = utterance;

      const voice = getVoiceForLanguage();
      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang;
      } else {
        utterance.lang = language === "ja" ? "ja-JP" : "en-US";
      }

      utterance.rate = rate;
      utterance.pitch = pitch;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    },
    [isSupported, getVoiceForLanguage, language, rate, pitch]
  );

  const cancel = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [isSupported]);

  useEffect(() => {
    return () => {
      if (isSupported) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isSupported]);

  return {
    speak,
    cancel,
    isSpeaking,
    isSupported,
    voiceReady,
  };
}
