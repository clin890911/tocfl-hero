import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, updateDoc, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "placeholder",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "placeholder",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "placeholder",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "placeholder",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "placeholder",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "placeholder"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const logOut = () => signOut(auth);

export const getUserData = async (uid) => {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? snap.data() : null;
};

export const createUserData = async (uid, data) => {
  await setDoc(doc(db, 'users', uid), {
    ...data,
    totalXP: 0,
    streak: 0,
    lastActiveDate: new Date().toISOString().split('T')[0],
    completedQuizzes: [],
    readingStats: { correct: 0, total: 0 },
    listeningStats: { correct: 0, total: 0 },
    bandAProgress: 0,
    bandBProgress: 0,
    achievements: [],
    createdAt: new Date().toISOString()
  });
};

export const updateUserData = async (uid, data) => {
  await updateDoc(doc(db, 'users', uid), data);
};

export const getLeaderboard = async (limitCount = 20) => {
  const q = query(collection(db, 'users'), orderBy('totalXP', 'desc'), limit(limitCount));
  const snap = await getDocs(q);
  return snap.docs.map((doc, i) => ({ id: doc.id, rank: i + 1, ...doc.data() }));
};
