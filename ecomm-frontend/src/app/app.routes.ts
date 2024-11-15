import { Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import path from 'path';
import { ProductsComponent } from './shop/products/products/products.component';
import { AddProductComponent } from './shop/products/add-product/add-product.component';
import { CatcollectionComponent } from './shop/products/catcollection/catcollection.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'add', component: AddProductComponent },
  { path: 'products/:category', component: CatcollectionComponent },
];
