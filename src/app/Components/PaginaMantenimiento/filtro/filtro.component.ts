import { Component, EventEmitter, Output } from '@angular/core';
import { Reporte } from '../../../Model/reporte';
import { ReporteService } from '../../../Services/reporte.service';
import { FiltroService } from '../../../Services/filtro.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-filtro',
  imports: [FormsModule],
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.css'
})
export class FiltroComponent {

buscarNombre: string = '';
buscarDescripcion: string = '';
buscarDia: string = '';
buscarEstado: string = '';
searchActive: boolean = false;

constructor(private filterService: FiltroService, private router: Router) {}

applyFilters() {
  this.filterService.setFilters({
    buscarNombre: this.buscarNombre,
    buscarDescripcion: this.buscarDescripcion,
    buscarDia: this.buscarDia,
    buscarEstado: this.buscarEstado !== '' ? this.buscarEstado === 'true' : null,
  });
  this.searchActive = true;
  this.router.navigate(['/user/galeria']);
}

deleteFilters() {
  this.buscarNombre = '';
  this.buscarDescripcion = '';
  this.buscarDia = '';
  this.searchActive = false;
  this.applyFilters();
}

clearFilters(): void {
  const resetFilters = {
    buscarNombre: '',
    buscarDescripcion: '',
    buscarDia: '',
    buscarEstado: null
  };

  // Actualiza los filtros en el servicio
  this.filterService.setFilters(resetFilters);  // Actualiza los filtros vacíos

  // No es necesario llamar a applyFilters aquí, ya que setFilters ya lo hace automáticamente
  console.log('Filtros restablecidos');
}


}
