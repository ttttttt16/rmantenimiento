import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ReporteService } from '../../../Services/reporte.service';
import { Reporte } from '../../../Model/reporte';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { FiltroService } from '../../../Services/filtro.service';

@Component({
  selector: 'app-galeria',
  imports:[NgFor, DatePipe,NgIf],
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent implements OnInit {
  reportes: Reporte[] = [];
  filtradoReportes: Reporte[] = [];
  buscarNombre: string = '';
  buscarDescripcion: string = '';
  buscarDia: string = '';
  buscarEstado: string = '';

  constructor(private reporteService: ReporteService, private filterService: FiltroService,  private cdr: ChangeDetectorRef) {
    this.reportes = this.reporteService.getReportes();
    this.filtradoReportes = [...this.reportes];
    console.log(this.reportes);  // Verifica qué datos estás obteniendo
  }
  

  

  ngOnInit() {
    console.log(this.reportes);  // Verifica si los datos se están cargando correctamente
    this.filterService.filters$.subscribe(filters => this.applyFilters(filters));
  }
  

  applyFilters(filters: any) {
  console.log('Aplicando filtros', filters); // Verifica los filtros que se están aplicando

  this.filtradoReportes = this.reportes.filter(photo => {
    // Filtro para el título
    const matchesTitle = filters.buscarNombre
      ? photo.nombre.toLowerCase().includes(filters.buscarNombre.toLowerCase())
      : true;

    // Filtro para la descripción
    const matchesDescription = filters.buscarDescripcion
      ? photo.descripcion.toLowerCase().includes(filters.buscarDescripcion.toLowerCase())
      : true;

    // Filtro para la fecha
    const matchesDate = filters.buscarDia
      ? new Date(photo.creacion).toISOString().split('T')[0] === filters.buscarDia
      : true;

    // Filtro para el estado
    const matchesIsActive = filters.buscarEstado !== null
      ? photo.estado === filters.buscarEstado
      : true;

    return matchesTitle && matchesDescription && matchesDate && matchesIsActive;
  });

  console.log('Reportes filtrados', this.filtradoReportes); // Verifica los reportes después de aplicar los filtros
  this.cdr.detectChanges();  // Asegura que la vista se actualice
}


  deletePhoto(photoId: string): void {
    this.reporteService.deleteReporte(photoId);
    this.filtradoReportes = this.filtradoReportes.filter(Reporte => Reporte.id !== photoId);
  }
}
