import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { auth, storage } from '../config/firebase';
import type { User as UserType } from '../types';
import toast from 'react-hot-toast';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../config/firebase';
import { doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';

interface ProfileData {
  username: string;
  bio: string;
  role: string;
  teacherKey?: string;
}

interface AuthContextType {
  user: UserType | null;
  isLoading: boolean;
  isSetupComplete: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  completeSetup: (userInfo: UserInfo) => Promise<void>;
  updateUserProfile: (profileData: {
    username: string;
    bio: string;
    role?: string;
    teacherKey?: string;
    profilePicture?: File | null;
  }) => Promise<void>;
}

interface User {
  name: string;
  role: string;
  bio: string;
  updatedAt: string;
  // add other relevant fields
}

interface UserInfo {
  name: string;
  role: 'student' | 'teacher';
  // Add other setup fields as needed
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

async function getTeacherKey(): Promise<string> {
  const keyDoc = await getDoc(doc(db, 'settings', 'teacherKey'));
  if (!keyDoc.exists()) throw new Error('Teacher key not found');
  return keyDoc.data().key;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSetupComplete, setIsSetupComplete] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setIsLoading(true);
      try {
        if (firebaseUser) {
          // Fetch additional user data from Firestore
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          const userData = userDoc.data();
          
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: userData?.name || firebaseUser.displayName,
            role: userData?.role,
            bio: userData?.bio,
            updatedAt: userData?.updatedAt?.toDate?.().toISOString(),
          });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Error loading user data');
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      const userData = userDoc.data();

      setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        name: userData?.name || userCredential.user.displayName,
        role: userData?.role,
        bio: userData?.bio,
        updatedAt: userData?.updatedAt?.toDate?.().toISOString(),
      });

      toast.success('Successfully logged in!');
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error('Invalid credentials');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await signOut(auth);
      setUser(null); // Clear user state
      localStorage.removeItem('user'); // Clear stored user data
      toast.success('Successfully logged out!');
      navigate('/'); // Navigate to home page instead of login
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserProfile = async (profileData: {
    username: string;
    bio: string;
    role?: string;
    teacherKey?: string;
    profilePicture?: File | null;
  }) => {
    if (!auth.currentUser) throw new Error('No user logged in');

    try {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      
      // Update data in Firestore
      const updateData = {
        name: profileData.username,
        bio: profileData.bio,
        role: profileData.role || user?.role,
        updatedAt: serverTimestamp(),
      };

      await setDoc(userRef, updateData, { merge: true });

      // Update Firebase Auth profile
      await updateProfile(auth.currentUser, {
        displayName: profileData.username,
      });

      // Get the updated document
      const updatedDoc = await getDoc(userRef);
      const userData = updatedDoc.data();

      // Update local state
      setUser(prev => ({
        ...prev!,
        name: profileData.username,
        bio: profileData.bio,
        role: profileData.role || prev?.role,
        updatedAt: userData?.updatedAt?.toDate?.().toISOString(),
      }));

      toast.success('Profile updated successfully');
    } catch (error: any) {
      console.error('Profile update error:', error);
      toast.error(error.message || 'Failed to update profile');
      throw error;
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create initial user document in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: email,
        name: '',
        role: 'student',
        bio: '',
        updatedAt: serverTimestamp(),
      });

      toast.success('Successfully signed up!');
      navigate('/setup');
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('Signup failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const completeSetup = async (userInfo: UserInfo) => {
    try {
      setIsLoading(true);
      const updatedUser = {
        ...user!,
        ...userInfo,
        isSetupComplete: true,
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsSetupComplete(true);
      toast.success('Profile setup completed!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Setup error:', error);
      toast.error('Setup failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    isSetupComplete,
    login,
    signup,
    logout,
    completeSetup,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};