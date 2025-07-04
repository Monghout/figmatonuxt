// ~/composables/useAuth.ts
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import type { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const useAuth = () => {
  const { auth, db, googleProvider } = useFirebase();
  const user = useState<User | null>("firebase-user", () => null);
  const error = ref<string | null>(null);
  const loading = ref(false);
  const success = ref(false);

  // Initialize auth state listener
  onAuthStateChanged(auth, (firebaseUser) => {
    user.value = firebaseUser;
  });

  // Google login
  const loginWithGoogle = async () => {
    try {
      loading.value = true;
      error.value = null;
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      error.value = (err as Error).message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Email/password login
  const loginWithEmail = async (email: string, password: string) => {
    try {
      loading.value = true;
      error.value = null;
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      error.value = (err as Error).message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Email/password signup
  const signUpWithEmail = async (
    email: string,
    password: string,
    username: string
  ) => {
    try {
      loading.value = true;
      error.value = null;
      success.value = false;

      // 1. Create user with email/password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // 2. Update profile with username
      await updateProfile(userCredential.user, {
        displayName: username,
      });

      // 3. Create user document in Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        email: email,
        username: username,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Update local user state immediately
      user.value = userCredential.user;
      success.value = true;

      return userCredential;
    } catch (err) {
      error.value = (err as Error).message;
      throw err;
    } finally {
      loading.value = false;
    }
  };
  // Password reset
  const sendResetEmail = async (email: string) => {
    try {
      loading.value = true;
      error.value = null;
      success.value = false;
      await sendPasswordResetEmail(auth, email);
      success.value = true;
    } catch (err) {
      error.value = (err as Error).message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      error.value = (err as Error).message;
      throw err;
    }
  };

  return {
    user,
    error,
    loading,
    success,
    loginWithGoogle,
    loginWithEmail,
    signUpWithEmail,
    sendResetEmail,
    logout,
  };
};
