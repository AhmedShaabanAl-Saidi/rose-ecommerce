export interface LoginParams {
  email: string;
  password: string;
}

export interface RegisterParams {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}
export interface ChangePasswordParams {
  oldPassword: string;
  password: string;
  rePassword: string;
}
export interface EditProfileParams {
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}
export interface ForgetPasswordParams {
  email: string;
}
export interface VerifyResetCodeParams {
  resetCode: string;
}
export interface ResetPasswordParams {
  email: string;
  newPassword: string;
}
