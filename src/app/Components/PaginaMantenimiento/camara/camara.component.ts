
import { CommonModule } from '@angular/common';
import { CameraService } from '../../../Services/camera.service';
import { Component, EventEmitter, inject, Output} from '@angular/core';
@Component({
  selector: 'app-camara',
  imports: [CommonModule],
  templateUrl: './camara.component.html',
  styleUrl: './camara.component.css'
})
export class CameraComponent {
  @Output() photoCaptured = new EventEmitter<string>(); // Asegúrate de que el tipo es string
  cameraService: CameraService;
  imgUrl: string = ''; // URL de la imagen capturada
  errorMessage: string = ''; // Mensaje de error
  loading: boolean = false; // Estado de carga
  captureMessage: string = 'No hay imagen capturada'; // Mensaje de estado
  flashActive: boolean = false; // Estado del flash

  constructor(cameraService: CameraService) {
    this.cameraService = cameraService;
  }

  async takePicture() {
    this.errorMessage = '';
    this.loading = true;
    this.flashActive = true;

    try {
      this.imgUrl = await this.cameraService.takePicture();
      if (!this.imgUrl) {
        throw new Error('No se obtuvo una imagen válida');
      }
      this.captureMessage = 'Imagen tomada con éxito';
      // Emitir la URL de la imagen capturada
      this.photoCaptured.emit(this.imgUrl); // Emitir correctamente como string
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error('Error al capturar imagen:', error);
      this.errorMessage = String(error);
      this.imgUrl = '';
      this.captureMessage = 'No hay imagen capturada';
    } finally {
      this.loading = false;
      setTimeout(() => this.flashActive = false, 300);
    }
  }
}