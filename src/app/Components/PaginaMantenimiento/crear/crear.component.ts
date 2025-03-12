import { Component } from '@angular/core';
import {  CameraComponent } from '../camara/camara.component';
import { ReporteService } from '../../../Services/reporte.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Reporte } from '../../../Model/reporte';

@Component({
  selector: 'app-crear',
  imports: [CameraComponent, FormsModule],
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent {
  imgUrl: string = ''; 
  reporteData: Reporte = {
    id: '',
    nombre: '',
    descripcion: '',
    url: '',
    equipo: '',
    creacion: new Date(),
    estado: false
  };

  constructor(private reporteService: ReporteService, private router: Router) {}

  // Asegúrate de que la variable que recibe el evento sea un string
  onPhotoCaptured(photoUrl: string): void {
    this.imgUrl = photoUrl; // La URL de la foto capturada se almacena correctamente
  }

  uploadPhoto(): void {
    if (!this.imgUrl || !this.reporteData.nombre || !this.reporteData.equipo || !this.reporteData.descripcion || this.reporteData.estado === null) {
      alert('Todos los campos son obligatorios');
      return;
    }
  
    const { nombre, descripcion, equipo, estado } = this.reporteData;
    this.reporteService.addReporte(this.imgUrl, nombre, descripcion, equipo, estado);

    this.reporteData = { id: '', nombre: '', descripcion: '', url: '', equipo: '', creacion: new Date(), estado: false };
    this.imgUrl = '';

    this.router.navigate(['/user/galeria']);
  }
}
