import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: 'ui-demo',
        loadComponent: () => import('./ui-demo/ui-demo.component').then(m => m.UiDemoComponent)
    }
];
