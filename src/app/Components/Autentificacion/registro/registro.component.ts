import { Component } from '@angular/core';
import { AutentificacionService } from '../../../Services/autentificacion.service';
import { User } from 'firebase/auth';
import { FormsModule } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { FirebaseError } from 'firebase/app';  // Ya tienes esto importado
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-registro',
  imports: [FormsModule, NgIf],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  email: string = '';
password: string = '';
emailLogin: string = '';
passwordLogin: string = '';
user: User | null = null;
errorMessage: string = '';

constructor(private authService: AutentificacionService, private router: Router) {}

async register() {
  try {
    this.user = await this.authService.registerWithEmail(this.email, this.password);
    this.router.navigate(['/login']);
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      this.errorMessage = error.message;
    } else {
      this.errorMessage = 'Error desconocido al registrar';
    }
  }
}

}
