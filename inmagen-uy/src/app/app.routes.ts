import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout';
import { HomeComponent } from './pages/home/home';
import { ServicesComponent } from './pages/services/services';
import { ProductsComponent } from './pages/products/products';
import { CateringComponent } from './pages/catering/catering';
import { ContactComponent } from './pages/contact/contact';
import { CareersComponent } from './pages/careers/careers';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'services', component: ServicesComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'catering', component: CateringComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'careers', component: CareersComponent },
      { path: '**', redirectTo: '' }
    ]
  }
];