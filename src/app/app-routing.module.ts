import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrenciesresolverService } from './resolvers/currenciesresolver.service';
import { LocationdataresolverService } from './resolvers/locationDataresolver.service';
import { PaymentResolverService } from './resolvers/payment-resolver.service';
import { PaymentProcessResolverService } from './resolvers/payment-process-resolver.service';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    resolve:{
      currencies: CurrenciesresolverService,
      locations: LocationdataresolverService
    }
  },
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'processing',
    loadChildren: () => import('./processin/processin.module').then(m => m.ProcessinModule)
  },
  {
    path: 'process/processing',
    loadChildren: () => import('./process/processing/processing.module').then(m => m.ProcessingModule),
    resolve:{
      data: PaymentProcessResolverService
    }
  },
  {
    ///:paymentIds/:token/:PayerID
    path: 'process/payment',
    loadChildren: () => import('./process/payment/payment.module').then(m => m.PaymentModule),
    resolve:{
      paymentData: PaymentResolverService,
      processData: PaymentProcessResolverService
  }
},
{
  path: 'beneficiary',
  loadChildren: () => import('./beneficiary/beneficiary.module').then(m => m.BeneficiaryModule)
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
