import { Injectable } from '@angular/core';
import { Reporte } from '../Model/reporte';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
 
  private reportes: Reporte[] = [
    {
      id: uuidv4(),
      nombre: 'Reporte 1',
      descripcion: 'Descripción del reporte 1',
      equipo: 'Equipo A',
      url: 'https://i.pinimg.com/736x/e8/56/1b/e8561b82b01d2b6e3026019e65bdbcab.jpg',
      creacion: new Date('2025-03-10T12:00:00'),
      estado: true
    },
    {
      id: uuidv4(),
      nombre: 'Reporte 2',
      descripcion: 'Descripción del reporte 2',
      equipo: 'Equipo B',
      url: 'https://i.pinimg.com/236x/dd/00/42/dd00427b47875b3b3eab663b2c4ec48f.jpg',
      creacion: new Date('2025-03-11T13:00:00'),
      estado: false
    },
    {
      id: uuidv4(),
      nombre: 'Reporte 3',
      descripcion: 'Descripción del reporte 3',
      equipo: 'Equipo C',
      url: 'https://via.placeholder.com/150',
      creacion: new Date('2025-03-12T14:00:00'),
      estado: true
    }
  ];

  addReporte(url: string, nombre: string, descripcion: string, equipo: string, estado: boolean): void {
    console.log('Subiendo reporte con los siguientes datos:', { url, nombre, descripcion, equipo, estado });
  
    // Validación simple para asegurarse de que no se agreguen reportes vacíos
    if (!url || !nombre || !descripcion || !equipo || estado === null || estado === undefined) {
      console.log('Todos los campos deben estar completos');
      return;
    }
  
    const newReporte: Reporte = {
      id: uuidv4(),
      nombre,
      descripcion,
      equipo,
      url,
      creacion: new Date(),
      estado
    };
    localStorage.setItem('reportes', JSON.stringify(this.reportes));
    this.reportes.unshift(newReporte);
    console.log('Nuevo reporte agregado:', newReporte);
  }
  

  getReportes(): Reporte[] {
    
    return this.reportes;
  }
  
  getReporteById(id: string): Reporte | null {
    return this.reportes.find(reporte => reporte.id === id) || null;
  }

  updateReporte(updatedReporte: Reporte): void {
    const index = this.reportes.findIndex(reporte => reporte.id === updatedReporte.id);
    if (index !== -1) {
      this.reportes[index] = updatedReporte;
      console.log('Reporte actualizado:', updatedReporte);
    }
  }

  deleteReporte(reporteId: string): void {
    const index = this.reportes.findIndex(reporte => reporte.id === reporteId);
    if (index !== -1) {
      this.reportes.splice(index, 1);
      localStorage.setItem('reportes', JSON.stringify(this.reportes));  // Actualiza localStorage
      console.log(`Reporte con ID ${reporteId} eliminado`);
    }
  }
  
}
