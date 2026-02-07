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
                    title: 'Welcome back!',
                    footerText: "Don't have an account yet?",
                    footerLinkText: 'Create one now!',
                    footerLinkRoute: '/auth/register'
                }
            },
            {
                path: 'register',
                loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent),
                data: {
                    title: 'Become part of our family!',
                    footerText: 'Already have an account?',
                    footerLinkText: 'Login now!',
                    footerLinkRoute: '/auth/login'
                }
            },
            {
                path: 'forgot-password',
                loadComponent: () => import('./pages/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent),
                data: {
                    title: 'Forgot Password?',
                    description: 'Enter your email to reset your password.',
                    footerText: 'Remember your password?',
                    footerLinkText: 'Login now!',
                    footerLinkRoute: '/auth/login'
                }
            },
            {
                path: 'otp-code',
                loadComponent: () => import('./pages/otp-code/otp-code.component').then(m => m.OtpCodeComponent),
                data: {
                    title: 'OTP Code',
                    description: 'Check your email for the verification code.',
                    footerText: "Didn't receive code?",
                    footerLinkText: 'Resend',
                    footerLinkRoute: '/auth/forgot-password'
                }
            },
            {
                path: 'reset-password',
                loadComponent: () => import('./pages/reset-password/reset-password.component').then(m => m.ResetPasswordComponent),
                data: {
                    title: 'Reset Password',
                    description: 'Enter your new password below.',
                    footerLinkText: 'Back to Login',
                    footerLinkRoute: '/auth/login'
                }
            },
        ]
    }
];