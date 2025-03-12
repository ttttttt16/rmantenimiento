import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltroService {
  private filtersSubject = new BehaviorSubject<any>({
    buscarNombre: '',
    buscarDescripcion: '',
    buscarDia: '',
    buscarEstado: null
  });

  filters$ = this.filtersSubject.asObservable();

  setFilters(filters: any) {
    console.log('Estableciendo filtros:', filters);
    this.filtersSubject.next(filters);
  }
}
