import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout';
import { HomeComponent } from './pages/home/home';
import { ServicesComponent } from './pages/services/services';
import { ProductsComponent } from './pages/products/products';
import { CateringComponent } from './pages/catering/catering';
import { ContactComponent } from './pages/contact/contact';
import { CareersComponent } from './pages/careers/careers';
import { CartComponent } from './pages/cart/cart';
import { PedidoRapidoComponent } from './pages/pedido-rapido/pedido-rapido.component';
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
      { path: 'cart', component: CartComponent },
      { path: 'pedido-gemini', component: PedidoRapidoComponent },
      { path: '**', redirectTo: '' }
    ]
  }
];