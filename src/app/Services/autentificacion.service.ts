import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut } from '@angular/fire/auth';
import { User, AuthError, prodErrorMap, debugErrorMap } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class AutentificacionService {
  private auth = inject(Auth);

  async registerWithEmail(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      console.log('Usuario registrado:', userCredential.user);
      return userCredential.user;
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/email-already-in-use') {
          console.error('Este correo ya está en uso. Intenta con otro.');
          throw new Error('Este correo ya está en uso.');
        }
      } else {
        console.error('Error en registro:', error);
      }
      throw error;
    }
  }

  async loginWithEmail(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      console.log('Usuario autenticado:', userCredential.user);
      return userCredential.user;
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/invalid-credential') {
          console.error('Datos inválidos. Verifica tu correo y contraseña.');
          throw new Error('Datos inválidos.');
        }
      } else {
        console.error('Error en inicio de sesión:', error);
      }
      throw error;
    }
  }

  async loginWithGoogle(): Promise<User | null> {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
      console.log('✅ Usuario autenticado:', result.user);
      return result.user;
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/popup-closed-by-user') {
          console.error('El usuario cerró el popup antes de completar el inicio de sesión.');
          throw new Error('El usuario cerró el popup antes de completar el inicio de sesión.');
        }
      } else {
        console.error('❌ Error en autenticación:', error);
      }
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      console.log('Usuario cerró sesión');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}
