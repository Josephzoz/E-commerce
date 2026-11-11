import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  
   {
    path: 'categories/subcategories/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'products/:type/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'p-details/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];

