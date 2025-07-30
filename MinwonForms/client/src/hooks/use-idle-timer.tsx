import { useEffect, useRef, useCallback } from 'react';

interface UseIdleTimerProps {
  timeout: number; // timeout in milliseconds
  onIdle: () => void;
  events?: string[];
}

export function useIdleTimer({ timeout, onIdle, events = ['click', 'touchstart', 'touchmove', 'mousemove', 'keypress'] }: UseIdleTimerProps) {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const onIdleRef = useRef(onIdle);

  useEffect(() => {
    onIdleRef.current = onIdle;
  }, [onIdle]);

  const resetTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      onIdleRef.current();
    }, timeout);
  }, [timeout]);

  useEffect(() => {
    // Start the timer initially
    resetTimer();

    // Add event listeners
    events.forEach(event => {
      document.addEventListener(event, resetTimer, { passive: true });
    });

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      events.forEach(event => {
        document.removeEventListener(event, resetTimer);
      });
    };
  }, [resetTimer, events]);

  return { resetTimer };
}
