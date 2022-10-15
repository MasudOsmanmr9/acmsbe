import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuth } from 'src/auth-guards/user-auth';

const routes: Routes = [
  { path: "", loadChildren: () => import("./dashboard/dashboard.module").then((m) => m.DashboardModule) }, //, canActivate: [UserAuth]
  { path: "auth", loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
