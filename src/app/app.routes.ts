import { Routes } from '@angular/router';
import { InicioComponent } from './Components/Autentificacion/inicio/inicio.component';
import { RegistroComponent } from './Components/Autentificacion/registro/registro.component';
import { PrincipalComponent } from './Components/PaginaMantenimiento/principal/principal.component';
import { GaleriaComponent } from './Components/PaginaMantenimiento/galeria/galeria.component';
import { CrearComponent } from './Components/PaginaMantenimiento/crear/crear.component';
import { FiltroComponent } from './Components/PaginaMantenimiento/filtro/filtro.component';
import { DescargaComponent } from './Components/PaginaMantenimiento/descarga/descarga.component';
import { PaginaGaleriaComponent } from './Components/PaginaMantenimiento/pagina-galeria/pagina-galeria.component';

export const routes: Routes = [
    { path: 'login', component: InicioComponent },
    { path: 'register', component: RegistroComponent },
    {
        path: 'user', component: PrincipalComponent,
        children: [
        { path: 'galeria', component: PaginaGaleriaComponent },
        { path: 'crear', component: CrearComponent },
        { path: 'filtros', component: FiltroComponent },
        { path: 'descarga', component: DescargaComponent },
        // { path: '', component:},
        ]
    },
    { path: '**', redirectTo: 'login' }
];
