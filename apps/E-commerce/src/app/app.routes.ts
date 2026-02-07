import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: 'auth',
        loadChildren: () => import('./feature/auth/auth.routes').then(m => m.authRoutes)
    },
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
    }
];