import { useEffect, useState, useCallback } from 'react';
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  QuerySnapshot,
  FirestoreError,
} from 'firebase/firestore';
import { dbService } from '../services/firebase/firebaseConfig';

import type { Sweet, SweetT } from '../types/Sweet';

export const useSweets = () => {
  const [sweets, setSweets] = useState<{
    loading: boolean;
    data: Sweet[] | null;
    error: FirestoreError | null;
  }>({
    loading: true,
    data: null,
    error: null,
  });

  const [retryCount, setRetryCount] = useState(0);

  const fetchData = useCallback(() => {
    const q = query(collection(dbService, 'sweets'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot: QuerySnapshot) => {
        const sweetsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as SweetT),
        }));
        setSweets({ loading: false, data: sweetsData, error: null });
      },
      (error: FirestoreError) => {
        // console.log('fetchDateError retryCount:', retryCount);
        if (retryCount < 3) {
          setRetryCount(retryCount + 1);
          fetchData();
        } else {
          setSweets({ loading: false, data: null, error });
        }
      }
    );

    return () => unsubscribe();
  }, [retryCount]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...sweets, retry: fetchData };
};
