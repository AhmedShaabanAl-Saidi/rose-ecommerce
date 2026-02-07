import { Routes } from '@angular/router';
import { AuthLayoutComponent } from '../../core/layout/auth-layout/auth-layout.component';

export const authRoutes: Routes = [
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            {
                path: 'login',
                loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
                data: {
                    title: 'AUTH.LOGIN.TITLE',
                    footerText: 'AUTH.LOGIN.FOOTER_TEXT',
                    footerLinkText: 'AUTH.LOGIN.FOOTER_LINK',
                    footerLinkRoute: '/auth/register'
                }
            },
            {
                path: 'register',
                loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent),
                data: {
                    title: 'AUTH.REGISTER.TITLE',
                    footerText: 'AUTH.REGISTER.FOOTER_TEXT',
                    footerLinkText: 'AUTH.REGISTER.FOOTER_LINK',
                    footerLinkRoute: '/auth/login'
                }
            },
            {
                path: 'forgot-password',
                loadComponent: () => import('./pages/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent),
                data: {
                    title: 'AUTH.FORGOT_PASSWORD.TITLE',
                    description: 'AUTH.FORGOT_PASSWORD.DESCRIPTION',
                    footerText: 'AUTH.FORGOT_PASSWORD.FOOTER_TEXT',
                    footerLinkText: 'AUTH.FORGOT_PASSWORD.FOOTER_LINK',
                    footerLinkRoute: '/auth/login'
                }
            },
            {
                path: 'otp-code',
                loadComponent: () => import('./pages/otp-code/otp-code.component').then(m => m.OtpCodeComponent),
                data: {
                    title: 'AUTH.OTP.TITLE',
                    description: 'AUTH.OTP.DESCRIPTION',
                    footerText: 'AUTH.OTP.FOOTER_TEXT',
                    footerLinkText: 'AUTH.OTP.FOOTER_LINK',
                    footerLinkRoute: '/auth/forgot-password'
                }
            },
            {
                path: 'reset-password',
                loadComponent: () => import('./pages/reset-password/reset-password.component').then(m => m.ResetPasswordComponent),
                data: {
                    title: 'AUTH.RESET_PASSWORD.TITLE',
                    description: 'AUTH.RESET_PASSWORD.DESCRIPTION',
                    footerLinkText: 'AUTH.RESET_PASSWORD.FOOTER_LINK',
                    footerLinkRoute: '/auth/login'
                }
            },
        ]
    }
];