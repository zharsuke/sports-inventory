import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './../../guards/auth.guard';
import { LoginGuard } from './../../guards/login.guard';
import { ItemListComponent } from './item/item-list/item-list.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';

const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    canActivate: [AuthGuard]  // Protected route
  },
  {
    path: 'admin/items', 
    component: ItemListComponent,
    canActivate: [AuthGuard]  // Protected route
  },
  {
    path: 'admin/users',
    component: UserListComponent,
    canActivate: [AuthGuard]  // Protected route
  },
  {
    path: 'admin/users/add',
    component: UserAddComponent,
    canActivate: [AuthGuard]  // Protected route
  },
  {
    path: 'admin/users/edit/:id',
    component: UserEditComponent,
    canActivate: [AuthGuard]  // Protected route
  },
  { 
    path: 'login', 
    component: LoginComponent,
    canActivate: [LoginGuard]  // Public route with guard
  },
  { 
    path: 'register', 
    component: RegisterComponent,
    canActivate: [LoginGuard]  // Public route with guard
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }