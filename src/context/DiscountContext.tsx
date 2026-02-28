import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface ActiveDiscount {
    gameId: number;
    originalPrice: number;
    discountedPrice: number;
    pct: number;           // e.g. 25 means 25% off
    expiresAt: number;     // Date.now() + 30_000
}

interface DiscountContextType {
    activeDiscounts: Record<number, ActiveDiscount>;
    applyDiscount: (discount: ActiveDiscount) => void;
    clearDiscount: (gameId: number) => void;
    getDiscount: (gameId: number) => ActiveDiscount | null;
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

    const getDiscount = useCallback(
        (gameId: number): ActiveDiscount | null => {
            const d = activeDiscounts[gameId];
            if (!d) return null;
            // Auto-expire if past expiry (safety guard)
            if (Date.now() > d.expiresAt) return null;
            return d;
        },
        [activeDiscounts],
    );

    return (
        <DiscountContext.Provider value={{ activeDiscounts, applyDiscount, clearDiscount, getDiscount }}>
            {children}
        </DiscountContext.Provider>
    );
};

export const useDiscounts = () => useContext(DiscountContext);
