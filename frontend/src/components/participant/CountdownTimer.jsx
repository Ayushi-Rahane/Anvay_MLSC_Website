import React, { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';

const CountdownTimer = ({ targetTime, label = 'Time Remaining', onExpire, accentColor = '#F9A24D' }) => {
    const [timeLeft, setTimeLeft] = useState(null);
    const [expired, setExpired] = useState(false);

    useEffect(() => {
        if (!targetTime) return;

        const tick = () => {
            const now = Date.now();
            const end = typeof targetTime === 'number' ? targetTime : new Date(targetTime).getTime();
            const diff = end - now;

            if (diff <= 0) {
                setTimeLeft({ minutes: 0, seconds: 0 });
                setExpired(true);
                onExpire?.();
                return;
            }

            setTimeLeft({
                minutes: Math.floor((diff / 1000 / 60) % 60),
                seconds: Math.floor((diff / 1000) % 60),
                hours: Math.floor(diff / 1000 / 60 / 60),
            });
        };

        tick();
        const interval = setInterval(tick, 1000);
        return () => clearInterval(interval);
    }, [targetTime, onExpire]);

    if (!timeLeft) return null;

    const pad = (n) => String(n).padStart(2, '0');
    const isUrgent = timeLeft.minutes < 2 && !timeLeft.hours;

    return (
        <div
            className="rounded-xl px-4 py-3 flex items-center gap-3 transition-all"
            style={{
                background: expired
                    ? 'rgba(239,68,68,0.1)'
                    : isUrgent
                        ? `rgba(239,68,68,0.08)`
                        : `${accentColor}08`,
                border: `1px solid ${expired ? '#ef444440' : isUrgent ? '#ef444430' : accentColor + '25'}`,
            }}
        >
            <Timer
                size={16}
                style={{ color: expired ? '#ef4444' : isUrgent ? '#ef4444' : accentColor }}
                className={isUrgent && !expired ? 'animate-pulse' : ''}
            />
            <div>
                <p className="text-[9px] uppercase tracking-widest text-gray-500">{label}</p>
                <p
                    className="font-heading font-bold text-lg leading-none mt-0.5 tabular-nums"
                    style={{ color: expired ? '#ef4444' : isUrgent ? '#f87171' : '#fff' }}
                >
                    {expired
                        ? 'EXPIRED'
                        : timeLeft.hours > 0
                            ? `${pad(timeLeft.hours)}:${pad(timeLeft.minutes)}:${pad(timeLeft.seconds)}`
                            : `${pad(timeLeft.minutes)}:${pad(timeLeft.seconds)}`
                    }
                </p>
            </div>
        </div>
    );
};

export default CountdownTimer;