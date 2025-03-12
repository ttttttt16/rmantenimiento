import { AutentificacionService } from '../../../Services/autentificacion.service';
import { User } from 'firebase/auth';
import { FormsModule } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { FirebaseError } from 'firebase/app';  // Ya tienes esto importado
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-inicio',
  imports: [FormsModule, NgIf,  RouterLink],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  email: string = '';
  password: string = '';
  emailLogin: string = '';
  passwordLogin: string = '';
  user: User | null = null;
  errorMessage: string = '';
  isLoginActive = true;

  toggleForm(formType: string): void {
    const loginForm = document.querySelector('.login');
    const signupForm = document.querySelector('.signup');

    if (formType === 'login') {
      loginForm?.classList.remove('slide-up');
      signupForm?.classList.add('slide-up');
    } else {
      signupForm?.classList.remove('slide-up');
      loginForm?.classList.add('slide-up');
    }
  }

  constructor(private authService: AutentificacionService, private router: Router) {}

  async register() {
    try {
      this.user = await this.authService.registerWithEmail(this.email, this.password);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        this.errorMessage = error.message;
      } else {
        this.errorMessage = 'Error desconocido al registrar';
      }
    }
  }

  async login() {
    try {
      this.user = await this.authService.loginWithEmail(this.emailLogin, this.passwordLogin);
      this.router.navigate(['/user']);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        this.errorMessage = error.message;
      } else {
        this.errorMessage = 'Error desconocido al iniciar sesión';
      }
    }
  }

  async loginWithGoogle() {
    try {
      this.user = await this.authService.loginWithGoogle();
      this.router.navigate(['/user/galeria']);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        this.errorMessage = error.message;
      } else {
        this.errorMessage = 'Error desconocido al autenticar con Google';
      }
    }
  }

  async logout() {
    try {
      await this.authService.logout();
      this.user = null;
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        this.errorMessage = error.message;
      } else {
        this.errorMessage = 'Error desconocido al cerrar sesión';
      }
    }
  }
}
