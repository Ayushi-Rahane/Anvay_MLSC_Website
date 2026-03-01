import { useEffect, useRef } from 'react';

/**
 * Custom hook for auto-refreshing data at a given interval.
 * @param {Function} callback - Function to call on each interval tick
 * @param {number} intervalMs - Interval in milliseconds (default: 30000 = 30s)
 * @param {boolean} enabled - Whether the auto-refresh is active
 */
const useAutoRefresh = (callback, intervalMs = 30000, enabled = true) => {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        if (!enabled) return;

        const tick = () => {
            savedCallback.current?.();
        };

        const id = setInterval(tick, intervalMs);
        return () => clearInterval(id);
    }, [intervalMs, enabled]);
};

export default useAutoRefresh;
