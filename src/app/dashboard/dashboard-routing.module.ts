
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard/dashboard.component";

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      {
        path: 'collections', loadChildren:()=>import('../collection/collection.module').then((m)=>m.CollectionModule),
      },
      {
        path: 'formview', loadChildren:()=>import('../schema-formview/schema-formview.module').then((m)=>m.SchemaFormviewModule),
      },
      {
        path: 'user', loadChildren:()=>import('../user/user.module').then((m)=>m.UserModule),
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }