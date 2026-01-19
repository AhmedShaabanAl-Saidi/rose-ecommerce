import { Routes } from '@angular/router';

export const authRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./auth').then(m => m.Auth),
        children: [
            {
                path: 'login',
                loadComponent: () => import('./pages/login/login').then(m => m.Login),
                title: 'Login'
            },
            {
                path: 'register',
                loadComponent: () => import('./pages/register/register').then(m => m.Register),
                title: 'Register'
            },
            {
                path: 'forgot-password',
                loadComponent: () => import('./pages/forgot-password/forgot-password').then(m => m.ForgotPassword),
                title: 'Forgot Password'
            },
            {
                path: 'verify-otp/:email',
                loadComponent: () => import('./pages/verify-otp/verify-otp').then(m => m.VerifyOtp),
                title: 'Verify Otp'
            },
            {
                path: 'new-password/:email',
                loadComponent: () => import('./pages/new-password/new-password').then(m => m.NewPassword),
                title: 'New Password'
            },
            {
                path: 'admission-inquiry',
                loadComponent: () => import('../modules/admissions/components/admissionInquiry/admission-inquiry/admission-inquiry')
                    .then(m => m.AdmissionInquiryComponent),
                title: 'Admission Inquiry'
            },
            {
                path: '**',
                redirectTo: 'login'
            }
        ],
    },
];