import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',    //default
    redirectTo: 'new-product',
  },
  {
    path: 'new-product',
    loadComponent: () =>
      import('./new-product-form/new-product-form.component').then(
        (c) => c.NewProductFormComponent
      ),
    title: 'Nuevo Producto'
  },
  {
    path: 'products-list',
    loadComponent: () =>
      import('./products-list/products-list.component').then(
        (c) => c.ProductsListComponent
      ),
    title: 'Inventario'
  },
  {
    path: 'edit-product/:id',
    loadComponent: () =>
      import('./edit-product-form/edit-product-form.component').then(
        (c) => c.EditProductFormComponent
      ),
    title: 'Editar Producto'
  },
];
