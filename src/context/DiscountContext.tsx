import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface ActiveDiscount {
    gameId: number;
    originalPrice: number;
    discountedPrice: number;
    pct: number;           // e.g. 25 means 25% off
    expiresAt: number | null; // null means pending activation
}

interface DiscountContextType {
    activeDiscounts: Record<number, ActiveDiscount>;
    applyDiscount: (discount: ActiveDiscount) => void;
    clearDiscount: (gameId: number) => void;
    clearPendingDiscount: (gameId: number) => void;
    getDiscount: (gameId: number) => ActiveDiscount | null;
    startDiscountTimer: (gameId: number) => void;
}

const DiscountContext = createContext<DiscountContextType>({} as DiscountContextType);

export const DiscountProvider = ({ children }: { children: ReactNode }) => {
    const [activeDiscounts, setActiveDiscounts] = useState<Record<number, ActiveDiscount>>({});

    const applyDiscount = useCallback((discount: ActiveDiscount) => {
        setActiveDiscounts(prev => ({ ...prev, [discount.gameId]: discount }));
    }, []);

    const clearDiscount = useCallback((gameId: number) => {
        setActiveDiscounts(prev => {
            const next = { ...prev };
            delete next[gameId];
            return next;
        });
    }, []);

    const clearPendingDiscount = useCallback((gameId: number) => {
        setActiveDiscounts(prev => {
            const d = prev[gameId];
            // Only clear it if it exists and hasn't been activated yet
            if (d && d.expiresAt === null) {
                const next = { ...prev };
                delete next[gameId];
                return next;
            }
            return prev;
        });
    }, []);

    const getDiscount = useCallback(
        (gameId: number): ActiveDiscount | null => {
            const d = activeDiscounts[gameId];
            if (!d) return null;
            // Auto-expire if past expiry (safety guard)
            if (d.expiresAt !== null && Date.now() > d.expiresAt) return null;
            return d;
        },
        [activeDiscounts],
    );

    const startDiscountTimer = useCallback(
        (gameId: number) => {
            setActiveDiscounts(prev => {
                const d = prev[gameId];
                // Only start if it exists and hasn't started yet
                if (!d || d.expiresAt !== null) return prev;
                return {
                    ...prev,
                    [gameId]: { ...d, expiresAt: Date.now() + 30_000 }
                };
            });

            // Automatically clear it after 30 seconds
            setTimeout(() => {
                clearDiscount(gameId);
            }, 30_000);
        },
        [clearDiscount],
    );

    return (
        <DiscountContext.Provider value={{
            activeDiscounts,
            applyDiscount,
            clearDiscount,
            clearPendingDiscount,
            getDiscount,
            startDiscountTimer
        }}>
            {children}
        </DiscountContext.Provider>
    );
};

export const useDiscounts = () => useContext(DiscountContext);
