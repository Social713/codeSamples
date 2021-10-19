import { createContext, useContext, useState } from 'react';
import { AuthService } from './AuthService';
import { useRouter } from 'next/router';
import 'firebase/firestore';
import firebase from 'firebase/app';


const authContext = createContext();

export default function useAuth() {
    return useContext(authContext);
}

export function AuthProvider(props) {

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  
  const router = useRouter();

  const loginWithGoogle = async () => {
    const { error, user } = await AuthService.loginWithGoogle();
    setUser(user ?? null);
    setError(error ?? '');
}

  const loginWithFacebook = async () => {
    const { error, user } = await AuthService.loginWithFacebook();
    setUser(user ?? null);
    setError(error ?? '');
  };

  const loginWithGitHub = async () => {
    const { error, user } = await AuthService.loginWithGitHub();
    setUser(user ?? null);
    setError(error ?? '');
  };

  const logout = async() => {
      await AuthService.logout();
      setUser(null);
  }

  const createUserWithEmailAndPassword = async (email, password) => {
    if(email && password){
    const {user, error} = await AuthService.createUserWithEmailAndPassword(email, password);
    if (error) {
      setError(error);
      return;
    }
    setUser(user ?? null);
    router.push(`/verify?email=${email}`)
    }else{
      setError('Email and password are required.')
    }
  }
  const value = {user, error, loginWithGoogle, createUserWithEmailAndPassword, logout, loginWithGitHub, loginWithFacebook, setUser };

  return <authContext.Provider value={value} {...props} />
}
