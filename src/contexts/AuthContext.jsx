import { createContext, useContext, useState, useEffect } from 'react';
import { auth, signInWithGoogle as fbSignIn, logOut as fbLogOut, getUserData, createUserData, updateUserData } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshUserData = async () => {
    if (user) {
      const data = await getUserData(user.uid);
      setUserData(data);
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        let data = await getUserData(u.uid);
        if (!data) {
          await createUserData(u.uid, {
            displayName: u.displayName,
            email: u.email,
            photoURL: u.photoURL
          });
          data = await getUserData(u.uid);
        }
        // Check streak
        const today = new Date().toISOString().split('T')[0];
        if (data.lastActiveDate !== today) {
          const lastDate = new Date(data.lastActiveDate);
          const todayDate = new Date(today);
          const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));
          const newStreak = diffDays === 1 ? (data.streak || 0) + 1 : diffDays === 0 ? data.streak : 0;
          await updateUserData(u.uid, { lastActiveDate: today, streak: newStreak });
          data = { ...data, lastActiveDate: today, streak: newStreak };
        }
        setUserData(data);
      } else {
        setUserData(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  return (
    <AuthContext.Provider value={{ user, userData, loading, signInWithGoogle: fbSignIn, logOut: fbLogOut, refreshUserData }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
