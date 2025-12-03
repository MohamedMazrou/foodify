import { Routes } from '@angular/router';
import path from 'node:path';
import { authGuard } from './core/guard/auth.guard';

export const routes: Routes = [
    {
        path:'',loadComponent:()=> import('../app/layout/Auth/auth-layout/auth-layout.component').then((c)=> c.AuthLayoutComponent),
    
        children:[
             { path: '', redirectTo: 'signin', pathMatch: 'full' },

            {path:'signin',loadComponent:()=> import('../app/pages/sign-in/sign-in.component').then((c)=>c.SignInComponent),pathMatch:'full'},
            {path:'signup',loadComponent:()=> import('../app/pages/signup/signup.component').then((c)=>c.SignupComponent),pathMatch:'full'},
          {path:'forgetPassword',loadComponent:()=> import('./pages/reset-password/reset-password.component').then((c)=>c.ResetPasswordComponent),pathMatch:'full'},
            {path:'otp',loadComponent:()=> import('./pages/otp/otp.component').then((c)=>c.OtpComponent),pathMatch:'full'},
            {path:'otpResetPass',loadComponent:()=> import('./pages/otp-reset-password/otp-reset-password.component').then((c)=>c.OtpResetPasswordComponent),pathMatch:'full'},
            {path:'newresetpassword',loadComponent:()=> import('./pages/new-password/new-password.component').then((c)=>c.NewPasswordComponent),pathMatch:'full'},
        ]
    },
// 
    {
        path:'user',loadComponent:()=> import('../app/layout/user/user/user.component').then((c)=> c.UserComponent),canActivate:[authGuard],
        children:[
            {path:'',redirectTo:'home',pathMatch:'full'},
            {path:'home',loadComponent:()=> import('../app/pages/home/home.component').then((c)=> c.HomeComponent),pathMatch:'full'},
            {path:'favourite',loadComponent:()=> import('../app/pages/fav/fav.component').then((c)=> c.FavComponent),pathMatch:'full'},
            {path:'categories',loadComponent:()=> import('../app/pages/category/category.component').then((c)=> c.CategoryComponent),pathMatch:'full'},
        ]


    }
];
