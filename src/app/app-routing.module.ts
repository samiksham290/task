import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:"login",
    loadChildren: ()=>import('./modules/login/login.module').then(m=>m.LoginModule)
  },
  {
    path:"registration",
    loadChildren: ()=>import('./modules/registration/registration.module').then(m=>m.RegistrationModule)
  },
  {
    path:"dashboard",
    loadChildren: ()=>import('./modules/dashboard/dashboard.module').then(m=>m.DashboardModule)
  },
  {
    path:"profile",
    loadChildren: ()=>import('./modules/profile/profile.module').then(m=>m.ProfileModule)
  },
  {
    path:"user",
    loadChildren: ()=>import('./modules/user/user.module').then(m=>m.UserModule) 
  },

  {
    path:'inventory',
    loadChildren:()=> import('./inventory/inventory.module').then(m=>m.InventoryModule)
  },
  {
    path:"**",
    redirectTo:"login"
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
