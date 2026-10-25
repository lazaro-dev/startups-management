import { Routes } from '@angular/router';
import { EstadoListComponent } from '@/app/features/estados/pages/estado-list/estado-list.component';

export const ESTADO_ROUTES: Routes = [
  {
    path: '',
    component: EstadoListComponent,
  },
];