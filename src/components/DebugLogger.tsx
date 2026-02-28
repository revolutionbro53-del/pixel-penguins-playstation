import React, { useEffect } from 'react';
import { useDiscounts } from '../context/DiscountContext';

export default function DebugLogger() {
    const { activeDiscounts } = useDiscounts();

    useEffect(() => {
        console.log("DEBUG LOGGER: activeDiscounts updated:", Object.values(activeDiscounts).map(d => ({
            id: d.gameId,
            expiresAt: d.expiresAt,
            secsLeft: d.expiresAt ? Math.round((d.expiresAt - Date.now()) / 1000) : 'null'
        })));
    }, [activeDiscounts]);

    return null;
}
