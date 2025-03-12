import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "reportes-bd71f", appId: "1:636916193971:web:73631a4aa4b514b80c2ec6", storageBucket: "reportes-bd71f.firebasestorage.app", apiKey: "AIzaSyB7Ma8a4zHrjE5aN3Umf4Jii0DFFN68fNQ", authDomain: "reportes-bd71f.firebaseapp.com", messagingSenderId: "636916193971", measurementId: "G-0KQRFZEZD6" })), provideAuth(() => getAuth())]
};
