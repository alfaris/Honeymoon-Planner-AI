import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  db, 
  User 
} from '../services/firebase';
import { doc, getDoc, setDoc, serverTimestamp, collection, addDoc, query, getDocs, orderBy, onSnapshot, updateDoc } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../utils/firebaseErrors';

interface UserContextType {
  user: User | null;
  loading: boolean;
  isLoggingIn: boolean;
  credits: number;
  isAdmin: boolean;
  instapayHandle: string;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  saveTrip: (tripData: any) => Promise<string>;
  getSavedTrips: () => Promise<any[]>;
  consumeCredit: () => Promise<boolean>;
  addCredits: (amount: number, targetUserId?: string) => Promise<boolean>;
  createPaymentRequest: (data: any) => Promise<boolean>;
  getPaymentRequests: (all?: boolean) => Promise<any[]>;
  adminUpdatePaymentStatus: (requestId: string, userId: string, amount: number, status: 'approved' | 'declined', comment?: string) => Promise<boolean>;
  updateInstapayHandle: (handle: string) => Promise<boolean>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [credits, setCredits] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [instapayHandle, setInstapayHandle] = useState('ahmedfaris@instapay');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    // Listen to global config
    const configRef = doc(db, 'config', 'settings');
    const unsubConfig = onSnapshot(configRef, (doc) => {
      if (doc.exists()) {
        setInstapayHandle(doc.data().instapayHandle || 'ahmedfaris@instapay');
      }
    });

    let unsubscribeUserDoc: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        const userRef = doc(db, 'users', currentUser.uid);
        
        // Listen for real-time updates to the user profile (including credits)
        unsubscribeUserDoc = onSnapshot(userRef, (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data();
            setCredits(data.credits ?? 0);
            setIsAdmin(data.isAdmin || currentUser.email === 'ahmedfaris.me@gmail.com');
          }
        }, (error) => {
          console.error("Error listening to user profile:", error);
        });

        // Sync initial user profile to Firestore if it doesn't exist
        try {
          const userDoc = await getDoc(userRef);
          if (!userDoc.exists()) {
            await setDoc(userRef, {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              email: currentUser.email,
              photoURL: currentUser.photoURL,
              credits: 10, // Initial gift
              isAdmin: currentUser.email === 'ahmedfaris.me@gmail.com',
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            });
            setCredits(10);
            setIsAdmin(currentUser.email === 'ahmedfaris.me@gmail.com');
          } else {
            const data = userDoc.data();
            // Auto-promote if hardcoded email match
            if (currentUser.email === 'ahmedfaris.me@gmail.com' && !data.isAdmin) {
              await updateDoc(userRef, { isAdmin: true });
            }
          }
        } catch (error) {
          console.error("Error syncing user profile:", error);
        }
      } else {
        setCredits(0);
        setIsAdmin(false);
        if (unsubscribeUserDoc) {
          unsubscribeUserDoc();
        }
      }
      setLoading(false);
      setIsLoggingIn(false);
    });

    return () => {
      unsubscribeAuth();
      unsubConfig();
      if (unsubscribeUserDoc) unsubscribeUserDoc();
    };
  }, []);

  const login = async () => {
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      if (error?.code === 'auth/cancelled-popup-request' || error?.code === 'auth/popup-closed-by-user') {
        console.log("Sign-in cancelled by user or overlapping request.");
      } else {
        console.error("Login failed:", error);
        throw error;
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  const consumeCredit = async () => {
    if (!user) return false;
    if (credits <= 0) return false;

    const userRef = doc(db, 'users', user.uid);
    try {
      await updateDoc(userRef, {
        credits: credits - 1,
        updatedAt: serverTimestamp()
      });
      return true;
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
      return false;
    }
  };

  const addCredits = async (amount: number, targetUserId?: string) => {
    if (!user) return false;
    const uid = targetUserId || user.uid;
    const userRef = doc(db, 'users', uid);

    try {
      const { increment } = await import('firebase/firestore');
      await updateDoc(userRef, {
        credits: increment(amount),
        updatedAt: serverTimestamp()
      });
      return true;
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${uid}`);
      return false;
    }
  };

  const createPaymentRequest = async (data: any) => {
    if (!user) return false;
    try {
      await addDoc(collection(db, 'payment_requests'), {
        ...data,
        userId: user.uid,
        userEmail: user.email,
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return true;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'payment_requests');
      return false;
    }
  };

  const getPaymentRequests = async (all = false) => {
    if (!user) return [];
    try {
      let q;
      if (all && isAdmin) {
        q = query(collection(db, 'payment_requests'), orderBy('createdAt', 'desc'));
      } else {
        const { where } = await import('firebase/firestore');
        q = query(
          collection(db, 'payment_requests'), 
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
      }
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as object }));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, 'payment_requests');
      return [];
    }
  };

  const adminUpdatePaymentStatus = async (requestId: string, userId: string, amount: number, status: 'approved' | 'declined', comment?: string) => {
    if (!isAdmin) return false;
    const requestRef = doc(db, 'payment_requests', requestId);
    
    try {
      await updateDoc(requestRef, {
        status,
        adminComment: comment || '',
        updatedAt: serverTimestamp()
      });

      if (status === 'approved') {
        await addCredits(amount, userId);
      }
      return true;
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'payment_requests');
      return false;
    }
  };

  const updateInstapayHandle = async (handle: string) => {
    if (!isAdmin) return false;
    const configRef = doc(db, 'config', 'settings');
    try {
      await setDoc(configRef, {
        instapayHandle: handle,
        updatedAt: serverTimestamp()
      }, { merge: true });
      return true;
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'config/settings');
      return false;
    }
  };

  const saveTrip = async (tripData: any) => {
    if (!user) throw new Error("Must be logged in to save a trip");
    
    const path = `users/${user.uid}/saved_trips`;
    try {
      const docRef = await addDoc(collection(db, path), {
        ...tripData,
        userId: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
      return '';
    }
  };

  const getSavedTrips = async () => {
    if (!user) return [];
    
    const path = `users/${user.uid}/saved_trips`;
    try {
      const q = query(collection(db, path), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as object }));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
      return [];
    }
  };

  return (
    <UserContext.Provider value={{ 
      user, loading, isLoggingIn, credits, isAdmin, instapayHandle,
      login, logout, saveTrip, getSavedTrips, consumeCredit, addCredits,
      createPaymentRequest, getPaymentRequests, adminUpdatePaymentStatus,
      updateInstapayHandle
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
