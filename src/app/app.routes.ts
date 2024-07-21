import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
  {path: '' , redirectTo:'/home', pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {
    path:'users',component:UserListComponent,
    canActivate:[authGuard],
    data:{
      role:'admin'
    }
  }
];
