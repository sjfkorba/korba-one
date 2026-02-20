import { useState, useEffect } from 'react';

export const useAdsTimer = (createdAt: any) => {
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (!createdAt) return;

    // Firebase timestamp ko date mein convert karna
    const adDate = createdAt.toDate ? createdAt.toDate() : new Date(createdAt);
    const currentDate = new Date();

    // 30 din ka difference nikalna (30 days * 24h * 60m * 60s * 1000ms)
    const diffTime = Math.abs(currentDate.getTime() - adDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 30) {
      setIsExpired(true);
    }
  }, [createdAt]);

  return isExpired;
};