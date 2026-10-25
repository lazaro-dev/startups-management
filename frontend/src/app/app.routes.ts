import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'estados',
        loadChildren: () =>
          import('./features/estados/estado.routes')
            .then((m) => m.ESTADO_ROUTES),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'estados',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'estados',
  },
];