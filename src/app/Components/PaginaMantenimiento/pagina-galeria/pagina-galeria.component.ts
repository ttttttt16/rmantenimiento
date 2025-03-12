import { Component } from '@angular/core';
import { GaleriaComponent } from '../galeria/galeria.component';
import { FiltroComponent } from '../filtro/filtro.component';

@Component({
  selector: 'app-pagina-galeria',
  imports:[GaleriaComponent,FiltroComponent],
  templateUrl: './pagina-galeria.component.html',
  styleUrl: './pagina-galeria.component.css'
})
export class PaginaGaleriaComponent {

}
